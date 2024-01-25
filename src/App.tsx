import { useEffect, useState } from "react";
import { fetchData } from "./lib/data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import {
  MainProps,
  ResultsProps,
  SinglePostProps,
  UserProps,
} from "./lib/typings";
import NavBar from "./pages/NavBar";
import TopCreators from "./components/feed/TopCreators";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import Bookmarks from "./pages/Bookmarks";
import People from "./pages/People";
import Explore from "./pages/Explore";
import CreatePost from "./pages/CreatePost";

export default function App() {
  const [mainData, setMainData] = useState<MainProps>({
    results: null,
    user: null,
  });

  const [bookmark, setBookmark] = useState<SinglePostProps[]>([]);
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
    const updateBookmark = mainData.results
      ?.flatMap((item) => {
        return item.posts;
      })
      .find((post) => post.id === id);

    if (updateBookmark) {
      setBookmark((data) => {
        if (data.find((item) => item.id === updateBookmark.id)) {
          setMainData((prevData) => {
            return {
              ...prevData,
              results: (prevData.results ?? []).flatMap((item) => {
                return {
                  ...item,
                  posts: item.posts?.map((post) => {
                    return post.id === updateBookmark.id
                      ? { ...post, bookmarks: post.bookmarks - 1 }
                      : post;
                  }),
                };
              }),
            };
          });

          return data.filter((item) => {
            return item.id !== updateBookmark.id;
          });
        } else {
          setMainData((prevData) => {
            const updatedData = (prevData.results ?? []).flatMap((item) => {
              return {
                ...item,
                posts: item.posts?.map((post) => {
                  return post.id === updateBookmark.id
                    ? { ...post, bookmarks: post.bookmarks + 1 }
                    : post;
                }),
              };
            });
            return {
              ...prevData,
              results: updatedData,
            };
          });

          return [...bookmark, updateBookmark];
        }
      });
    }
  }

  function addFollowers(username: string) {
    setMainData((prevData: MainProps): MainProps => {
      return {
        ...prevData,
        results: (prevData.results ?? []).map((result) => {
          return {
            ...result,
            user:
              result.user.username === username
                ? { ...result.user, followers: result.user.followers + 1 }
                : result.user,
          };
        }),
      };
    });
  }

  function handleLikes(id: number): MainProps {
    if (mainData.results) {
      const updateLikes = (mainData.results ?? []).map((item) => {
        return {
          ...item,
          posts: item.posts?.map((post) => {
            return post.id === id ? { ...post, likes: post.likes + 1 } : post;
          }),
        };
      });

      setMainData({ ...mainData, results: updateLikes });
    }

    return { results: null, user: null };
  }
  useEffect(() => {
    function handleSearch() {
      if (mainData.results) {
        const updatePost: SinglePostProps[] = mainData.results.flatMap(
          (item: ResultsProps) => {
            return (
              item?.posts?.filter((post: SinglePostProps) => {
                return post?.description.includes(searchInput);
              }) || []
            );
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

  useEffect(() => {
    console.log(mainData);
  }, [mainData]);

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
                isLoading={isLoading}
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
          <Route
            path="/saved"
            element={<Bookmarks userData={userData} bookmark={bookmark} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
