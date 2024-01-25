import React from "react";
import { MainProps, ResultsProps, SinglePostProps } from "../data/typings";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Post from "./Post";

interface ExploreProps {
  mainData: MainProps;
  searchInput: string;
  setSearchInput: (value: string) => void;
  filteredPost: SinglePostProps[] | undefined
  handleLikes: (value: number) => void;
}

export default function Explore(props: ExploreProps) {
  const { mainData, filteredPost, searchInput, setSearchInput, handleLikes } =
    props;
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
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Popular Post Today</h1>

        <div className="flex flex-wrap gap-x-4">
   
          {filteredPost?.map((post) => {
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
      </div>
    </div>
  );
}
