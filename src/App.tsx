import { useEffect, useState } from "react";
import { fetchData } from "./data/data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import {
  MainProps,
  PostProps,
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

  const [bookmark, setBookmark] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredPost, setFilteredPost] = useState<
    SinglePostProps[] | undefined
  >(mainData.results?.flatMap((item) => item.posts));

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
        .flatMap((item: PostProps) => {
          return item.posts.find((post: SinglePostProps) => {
            return post.id === id;
          });
        })
        .find((item) => item !== undefined);

      if (findBookmarkItem) {
        setBookmark((prevData: PostProps[]): PostProps[] => {
          const updateData: PostProps[] = prevData.map((item: PostProps) => {
            return {
              ...item,
              posts: item.posts.map((post: SinglePostProps) => {
                return post.id === id
                  ? { ...post, bookmark: post.bookmarks - 1 }
                  : post;
              }),
            };
          });

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

          const filteredData: PostProps[] = updateData.filter(
            (item: PostProps) => {
              item.posts.find((post: SinglePostProps) => post.id !== id);
            }
          );
          return [...filteredData];
        });
      } else {
        setBookmark((prevData: PostProps[]): PostProps[] => {
          const updatedData: PostProps[] = prevData.map((item: PostProps) => {
            return {
              ...item,
              posts: item.posts.map((post: SinglePostProps) => {
                return post.id === findItem.id
                  ? { ...post, ...findItem, bookmarks: post.bookmarks + 1 }
                  : post;
              }),
            };
          });

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
  console.log(mainData);

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
        const updatePost: SinglePostProps[] = mainData.results.flatMap(
          (item: ResultsProps) => {
            return item.posts.filter((post: SinglePostProps) => {
              return post.description.includes(searchInput);
            });
          }
        );
        setFilteredPost(updatePost);
      }
    }
    handleSearch();
  }, [searchInput, mainData.results]);

  console.log(mainData.results?.map((item) => item));

  // function handleUpload (id: number) {

  //   setMainData((prevData: MainProps): MainProps => {
  //     return {
  //       ...prevData
  //     }
  //   })

  // }

  console.log(filteredPost)
  return (
    <div className="flex mx-auto max-w-[1600px] h-[100vh] gap-x-4 ">
      <Router>
        <NavBar isLoading={isLoading} mainData={mainData} />
        <Routes>
          {/* <Route
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
          */}

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
          {/* <Route path="/saved" element={<Bookmarks bookmark={bookmark} />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
