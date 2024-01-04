import { useEffect, useState } from "react";
import { fetchData } from "./data/data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import { MainProps, ResultsProps } from "./data/typings";
import NavBar from "./components/NavBar";
import TopCreators from "./components/TopCreators";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";

export default function App() {
  const [mainData, setMainData] = useState<MainProps>({
    results: null,
    user: null,
  });
  const [bookmark, setBookmark] = useState<ResultsProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userData = mainData.results?.map((item) => {
    return item.user;
  });

  useEffect(() => {
    async function fetchAllData() {
      try {
        setIsLoading(true);
        const data = await fetchData();
        setMainData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }
    fetchAllData();
  }, []);

  function addBookmark(id: number) {
    const findItem = mainData.results?.find((item) => item.id === id);

    if (findItem) {
      if (bookmark.find((item) => item.id === id)) {
        setBookmark((prevData) => {
          const updatedData = prevData.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                bookmarks: item.bookmarks - 1,
              };
            } else {
              return item;
            }
          });

          setMainData((prevData): MainProps => {
            const updateData = prevData!.results!.map((item) => {
              return item.id === id
                ? { ...item, bookmarks: item.bookmarks - 1 }
                : item;
            });

            return {
              ...prevData,
              results: updateData,
            };
          });

          return updatedData.filter((item) => item.id !== id);
        });
      } else {
        setBookmark((prevData) => {
          setMainData((prevData): MainProps => {
            const updateMainData = prevData.results!.map((item) => {
              return item.id === id
                ? { ...item, bookmarks: item.bookmarks + 1 }
                : item;
            });

            return {
              ...prevData,
              results: updateMainData,
            };
          });

          return [
            ...prevData,
            { ...findItem, bookmarks: findItem.bookmarks + 1 },
          ];
        });
      }
    }
  }

  function addFollowers(username: string) {
    if (userData) {
      setMainData((prevData) => {
        return {
          ...prevData,
          results: prevData.results!.map((item) => {
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
  }

  function handleLikes(id: number) {
    if (mainData.results) {
      const updateLikes = mainData.results?.map((item) => {
        return item.id === id ? { ...item, likes: item.likes + 1 } : item;
      });

      setMainData({ ...mainData, results: updateLikes });
    }
  }

  return (
    <div className="flex mx-auto max-w-[1600px] h-[100vh] gap-x-4 ">
      <Router>
        <NavBar isLoading={isLoading} mainData={mainData} />
        <Routes>
          <Route
            path="/"
            element={
              <Feed
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
          <Route path="/update-profile/:username" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </div>
  );
}
