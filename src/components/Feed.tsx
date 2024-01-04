import React from "react";
import { MainProps, ResultsProps, UserProps } from "../data/typings";
import Posts from "./Posts";
import TopCreators from "./TopCreators";

interface FeedProps {
  mainData: MainProps;
  setMainData: (value: MainProps) => void;
  addBookmark: (value: number) => void;
  bookmark: ResultsProps[];
  userData: UserProps[] | undefined;
  addFollowers: (value: string) => void;
}
export default function Feed(props: FeedProps) {
  const { mainData, setMainData, addBookmark, bookmark, addFollowers,userData } = props;

  function updateLikes(id: number) {
    if (mainData.results) {
      const updateResults = mainData.results.map((item) => {
        return item.id === id ? { ...item, likes: item.likes + 1 } : item;
      });

      setMainData({ ...mainData, results: updateResults });
    }
  }

  return (
    <>
      <div className="lg:p-16 space-y-8 overflow-y-scroll py-16  px-4  flex-1 lg:max-w-[700px] w-full text-white flex-col flex 2xl:max-w-[800px]">
        <h1 className="font-bold text-3xl">Home Feed</h1>
        <div>
          {mainData.results?.map((data) => {
            return (
              <Posts
                bookmark={bookmark}
                addBookmark={addBookmark}
                updateLikes={updateLikes}
                {...data}
                key={data.id}
              />
            );
          })}
        </div>
      </div>
      <TopCreators addFollowers={addFollowers} userData={userData} />
    </>
  );
}
