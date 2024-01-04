import { useEffect, useState } from "react";
import { fetchData } from "./data/data";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import { MainProps, ResultsProps } from "./data/typings";
import NavBar from "./components/NavBar";
import TopCreators from "./components/TopCreators";

export default function App() {
  const [mainData, setMainData] = useState<MainProps>({
    results: null,
    user: null,
  });
  const [bookmark, setBookmark] = useState<ResultsProps[]>([]);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const data = await fetchData();
        setMainData(data);
      } catch (error) {
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

  return (
    <div className="flex h-[100vh] gap-x-4 ">
      <Router>
        <NavBar mainData={mainData} />
        <Routes>
          <Route
            path="/"
            element={
              <Feed
                bookmark={bookmark}
                addBookmark={addBookmark}
                setMainData={setMainData}
                mainData={mainData}
              />
            }
          />
        </Routes>
        <TopCreators />
      </Router>
    </div>
  );
}
