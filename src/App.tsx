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

  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [hashTagsInput, setHashTagsInput] = useState<string[]>([""]);
  const [idCounter, setIdCounter] = useState<number>(27);
  const [fileImageUrl, setFileImageUrl] = useState<File | null>(null);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentMonthDate = today.getDate();
  let fullDate = `${currentYear}-${currentMonth}-${currentMonthDate}`;

  if (currentMonth >= 10) {
    fullDate = `${currentYear}-${currentMonth}-${currentMonthDate}`;
  } else {
    fullDate = `${currentYear}-0${currentMonth}-${currentMonthDate}`;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileImageUrl(file);
  };

  function handleUpload(id: number) {
    const newPost: SinglePostProps = {
      id: idCounter,
      bookmarks: 0,
      description: descriptionInput,
      date: fullDate,
      hashtags: hashTagsInput,
      likes: 0,
      location: locationInput,
      photo: fileImageUrl
        ? URL.createObjectURL(fileImageUrl)
        : "/assets/photos/smoothie.jpeg",
    };
    setIdCounter((prev) => prev + 1);

    setMainData((prevData) => {
      return {
        ...prevData,
        results: (prevData.results ?? []).map((item) => {
          return {
            ...item,
            posts: item.id === id ? item.posts.concat(newPost) : item.posts,
          };
        }),
      };
    });
    setFileImageUrl(null);
  }

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

          <Route
            path="/create-post"
            element={
              <CreatePost
                fileImageUrl={fileImageUrl}
                handleFileChange={handleFileChange}
                hashTagsInput={hashTagsInput}
                setHashTagsInput={setHashTagsInput}
                descriptionInput={descriptionInput}
                setDescriptionInput={setDescriptionInput}
                setLocationInput={setLocationInput}
                locationInput={locationInput}
                handleUpload={handleUpload}
              />
            }
          />
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
