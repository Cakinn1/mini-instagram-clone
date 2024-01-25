import { useEffect, useState } from "react";
import { fetchData } from "./data/data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import {
  MainProps,
  ResultsProps,
  SinglePostProps,
  UserProps,
} from "./data/typings";
import NavBar from "./components/NavBar";
import TopCreators from "./components/TopCreators";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import Bookmarks from "./components/Bookmarks";
import People from "./components/People";
import Explore from "./components/Explore";
import CreatePost from "./components/CreatePost";

export default function App() {
  const [mainData, setMainData] = useState<MainProps>({
    results: null,
    user: null,
  });

  const [bookmark, setBookmark] = useState<ResultsProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredPost, setFilteredPost] = useState<
    SinglePostProps[] | undefined
  >(mainData.results?.flatMap((item: ResultsProps) => item.posts));

  const userData: UserProps[] | undefined = mainData.results?.map(
    (item: ResultsProps) => {
      return item.user;
    }
  );

  useEffect(() => {
    async function fetchAllData(): Promise<void> {
      try {
        setIsLoading(true);
        const data: MainProps = await fetchData();
        setMainData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }
    fetchAllData();
  }, []);

  function addBookmark(id: number): void {
    const findItem: SinglePostProps | undefined = mainData.results
      ?.flatMap((item: ResultsProps) => {
        return item.posts.find((post: SinglePostProps) => {
          return post.id === id;
        });
      })
      .find((item) => item !== undefined);

    if (findItem) {
      const findBookmarkItem: SinglePostProps | undefined = bookmark
        .flatMap((item: ResultsProps) => {
          return item.posts.find((post: SinglePostProps) => {
            return post.id === id;
          });
        })
        .find((item) => item !== undefined);

      if (findBookmarkItem) {
        setBookmark((prevData: ResultsProps[]): ResultsProps[] => {
          const updateData: ResultsProps[] = prevData.map(
            (item: ResultsProps) => {
              return {
                ...item,
                posts: item.posts.map((post: SinglePostProps) => {
                  return post.id === id
                    ? { ...post, bookmark: post.bookmarks - 1 }
                    : post;
                }),
              };
            }
          );

          setMainData((data: MainProps): MainProps => {
            const updateData: ResultsProps[] = (data.results || []).map(
              (item: ResultsProps) => {
                return {
                  ...item,
                  posts: item.posts.map((post: SinglePostProps) => {
                    return post.id === id
                      ? { ...post, bookmark: post.bookmarks - 1 }
                      : post;
                  }),
                };
              }
            );
            return {
              ...data,
              results: updateData,
            };
          });

          const filteredData: ResultsProps[] = updateData.filter(
            (item: ResultsProps) => {
              item.posts.find((post: SinglePostProps) => post.id !== id);
            }
          );
          return [...filteredData];
        });
      } else {
        setBookmark((prevData: ResultsProps[]): ResultsProps[] => {
          const updatedData: ResultsProps[] = prevData.map(
            (item: ResultsProps) => {
              return {
                ...item,
                posts: item.posts.map((post: SinglePostProps) => {
                  return post.id === findItem.id
                    ? { ...post, ...findItem, bookmarks: post.bookmarks + 1 }
                    : post;
                }),
              };
            }
          );

          setMainData((prevData: MainProps): MainProps => {
            const updateMainData: ResultsProps[] = (prevData.results || []).map(
              (item: ResultsProps) => {
                return {
                  ...item,
                  posts: item.posts.map((post: SinglePostProps) => {
                    return post.id === id
                      ? { ...post, bookmark: post.bookmarks + 1 }
                      : post;
                  }),
                };
              }
            );
            return {
              ...prevData,
              results: updateMainData,
            };
          });

          return updatedData;

          // return [...prevData, {upd}];
        });
      }
    }
  }

  function addFollowers(username: string): MainProps {
    if (userData) {
      setMainData((prevData: MainProps): MainProps => {
        return {
          ...prevData,
          results: prevData.results!.map((item: ResultsProps) => {
            return item.user.username === username
              ? {
                  ...item,
                  user: { ...item.user, followers: item.user.followers + 1 },
                }
              : item;
          }),
        };
      });
    }
    return { results: null, user: null };
  }

  function handleLikes(id: number): MainProps {
    if (mainData.results) {
      const updateLikes: ResultsProps[] = mainData.results.map(
        (item: ResultsProps) => {
          return {
            ...item,
            posts: item.posts.map((post: SinglePostProps) => {
              return post.id === id ? { ...post, likes: post.likes + 1 } : post;
            }),
          };
        }
      );
      setMainData((prevData: MainProps) => {
        return {
          ...prevData,
          results: updateLikes || null,
        };
      });
    }

    return { results: null, user: null };
  }
  useEffect(() => {
    function handleSearch() {
      if (mainData.results) {

        console.log(mainData)
        const updatePost: SinglePostProps[] = mainData.results.flatMap(
          (item: ResultsProps) => {
            return item?.posts?.filter((post: SinglePostProps) => {
              return post?.description.includes(searchInput);
            }) || [];
          }
        );
        setFilteredPost(updatePost);
      }
    }
    handleSearch();
  }, [searchInput, mainData.results]);

  // function handleUpload (id: number) {

  //   setMainData((prevData: MainProps): MainProps => {
  //     return {
  //       ...prevData
  //     }
  //   })

  // }

  console.log(mainData);
  return (
    <div className="flex mx-auto max-w-[1600px] h-[100vh] gap-x-4 ">
      <Router>
        <NavBar isLoading={isLoading} mainData={mainData} />
        <Routes>
          <Route
            path="/"
            element={
              <Feed
                handleLikes={handleLikes}
                isLoading={isLoading}
                addFollowers={addFollowers}
                userData={userData}
                bookmark={bookmark}
                addBookmark={addBookmark}
                setMainData={setMainData}
                mainData={mainData}
              />
            }
          />
          <Route
            path="/profile/:username"
            element={<Profile handleLikes={handleLikes} mainData={mainData} />}
          />

          <Route path="/create-post" element={<CreatePost />} />

          <Route
            path="/explore"
            element={
              <Explore
                handleLikes={handleLikes}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
                filteredPost={filteredPost}
                mainData={mainData}
              />
            }
          />
          <Route
            path="/people"
            element={
              <People
                userData={userData}
                isLoading={isLoading}
                mainData={mainData}
              />
            }
          />
          <Route path="/update-profile/:username" element={<UpdateProfile />} />
          <Route path="/saved" element={<Bookmarks bookmark={bookmark} />} />
        </Routes>
      </Router>
    </div>
  );
}
