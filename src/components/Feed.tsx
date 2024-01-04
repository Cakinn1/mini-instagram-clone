import React from "react";
import { MainProps, ResultsProps } from "../data/typings";
import Posts from "./Posts";

interface FeedProps {
  mainData: MainProps;
  setMainData: (value: MainProps) => void;
  addBookmark: (value: number) => void
  bookmark: ResultsProps[]
}
export default function Feed(props: FeedProps) {
  const { mainData, setMainData, addBookmark, bookmark } = props;

  function updateLikes(id: number) {
    if (mainData.results) {
      const updateResults = mainData.results.map((item) => {
        return item.id === id ? { ...item, likes: item.likes + 1 } : item;
      });

      setMainData({ ...mainData, results: updateResults });
    }
  }

  return (
    <div className="p-16 space-y-8 overflow-y-scroll enable-scrol text-white flex-col flex flex-1 max-w-[800px]">
      <h1 className="font-bold text-3xl">Home Feed</h1>
      <div className=" ">
        {mainData.results?.map((data) => {
          return <Posts bookmark={bookmark} addBookmark={addBookmark} updateLikes={updateLikes} {...data} key={data.id} />;
        })}
      </div>
    </div>
  );
}
