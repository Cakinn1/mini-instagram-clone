import { useEffect, useState } from "react";
import { fetchData } from "./data/data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import { MainProps, ResultsProps, UserProps } from "./data/typings";
import NavBar from "./components/NavBar";
import TopCreators from "./components/TopCreators";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import Bookmarks from "./components/Bookmarks";

export default function App() {
  const [mainData, setMainData] = useState<MainProps>({
    results: null,
    user: null,
  });
  const [bookmark, setBookmark] = useState<ResultsProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const findItem: ResultsProps | undefined = mainData.results?.find(
      (item: ResultsProps) => item.id === id
    );

    if (findItem) {
      const findBookmarkItem: ResultsProps | undefined = bookmark.find(
        (item: ResultsProps) => item.id === id
      );

      if (findBookmarkItem) {
        setBookmark((prevData: ResultsProps[]): ResultsProps[] => {
          const updatedData: ResultsProps[] = prevData.map(
            (item: ResultsProps) => {
              if (item.id === id) {
                return {
                  ...item,
                  bookmarks: item.bookmarks - 1,
                };
              } else {
                return item;
              }
            }
          );

          setMainData((prevData: MainProps): MainProps => {
            const updateData: ResultsProps[] = (prevData.results || []).map(
              (item: ResultsProps): ResultsProps => {
                return item.id === id
                  ? { ...item, bookmarks: item.bookmarks - 1 }
                  : item;
              }
            );

            return {
              ...prevData,
              results: updateData,
            };
          });

          return updatedData.filter((item: ResultsProps) => item.id !== id);
        });
      } else {
        setBookmark((prevData: ResultsProps[]): ResultsProps[] => {
          setMainData((prevData: MainProps): MainProps => {
            const updateMainData: ResultsProps[] = (prevData.results || []).map(
              (item: ResultsProps) => {
                return item.id === id
                  ? { ...item, bookmarks: item.bookmarks + 1 }
                  : item;
              }
            );

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
      const updateLikes: ResultsProps[] = mainData.results?.map(
        (item: ResultsProps) => {
          return item.id === id ? { ...item, likes: item.likes + 1 } : item;
        }
      );

      setMainData((prevData: MainProps) => {
        return { ...prevData, results: updateLikes };
      });
    }
    return { results: null, user: null };
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
          <Route path="/saved" element={<Bookmarks bookmark={bookmark} />} />
        </Routes>
      </Router>
    </div>
  );
}
