import React, { useEffect, useState } from "react";
import { MainProps, ResultsProps, SinglePostProps } from "../lib/typings";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Post from "../components/ui/Post";

interface ExploreProps {
  mainData: MainProps;
  searchInput: string;
  setSearchInput: (value: string) => void;
  filteredPost: SinglePostProps[] | undefined;
  handleLikes: (value: number) => void;
  isLoading: boolean;
}

export default function Explore(props: ExploreProps) {
  const {
    mainData,
    filteredPost,
    searchInput,
    setSearchInput,
    handleLikes,
    isLoading,
  } = props;

  const [lastIndex, setLastIndex] = useState<number>(6);

  return (
    <div className="p-16 space-y-12 text-white flex flex-1 flex-col">
      <h1 className="text-3xl font-bold">Search Posts</h1>
      <div className="flex relative items-center ">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by post description"
          className="w-full px-10 placeholder:text-[#7878a3] bg-[#1f1f22] placeholder:opacity-60 py-3 focus:outline-none rounded-md"
        />
        <FaMagnifyingGlass className="absolute left-3 opacity-60 text-lg text-[#7878a3]" />
      </div>
      <div className="space-y-6 pb-10">
        <h1 className="text-3xl font-bold">Popular Post Today</h1>

        <div className="flex flex-wrap p gap-x-4">
          {isLoading
            ? new Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    className="h-[300px] w-full lg:w-[48%] xl:w-[30%] mb-4 bg-gray-300 animate-pulse"
                    key={index}
                  ></div>
                ))
            : filteredPost
                ?.sort((a, b) => b.likes - a.likes)
                .slice(0, lastIndex)
                .map((post) => {
                  return (
                    <Post
                      id={post.id}
                      photo={post.photo}
                      handleLikes={handleLikes}
                      likes={post.likes}
                    />
                  );
                })}
        </div>
        <div className="flex justify-center items-center mr-14">
          {lastIndex <= 25 && !isLoading && (
            <button
              className=" px-8 py-2 rounded-md bg-[#877eff] hover:scale-105 active:scale-90 duration-300"
              onClick={() => {
                setLastIndex((prevIndex) => prevIndex + 6);
              }}
            >
              More Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
