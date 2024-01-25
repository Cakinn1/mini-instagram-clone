import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MainProps, ResultsProps } from "../lib/typings";
import { FaEdit } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import Post from "../components/ui/Post";
interface ProfileProps {
  mainData: MainProps;
  handleLikes: (value: number) => void;
}

export default function Profile(props: ProfileProps) {
  const { mainData, handleLikes } = props;
  const { username } = useParams();
  const [isSelected, setIsSelected] = useState<string>("Post");
  const [postSelected, setPostSelected] = useState<boolean>(true);

  const filterData: ResultsProps[] | undefined = (
    mainData.results ?? []
  ).filter((item: ResultsProps) => {
    return item?.user?.username === username;
  });

  function handleSelect(value: string): void {
    setIsSelected(value);
    if (value === isSelected) {
      setIsSelected("");
    }

    if (value === "Post") {
      setPostSelected(!postSelected);
    } else {
      setPostSelected(false);
    }
  }

  return (
    <div className="text-white flex flex-1 ">
      <div className="flex flex-col p-16 flex-1">
        {filterData?.map((item) => {
          return (
            <>
              <div className="flex h-[200px]   gap-x-4">
                <h1 className="h-32 w-32 bg-blue-500 rounded-full flex justify-center text-black items-center text-5xl">
                  {item.user.username.slice(0, 1).toUpperCase()}
                </h1>
                <div className="pt-2 space-y-1 flex flex-1 flex-col ">
                  <div className="flex justify-between  items-center w-full">
                    <div>
                      <h1 className="text-3xl font-bold">
                        @{item.user.username}
                      </h1>
                      <h2 className="text-lg text-[#7878A3] font-semibold">
                        {item.user.location}
                      </h2>
                    </div>
                    <Link to={`/update-profile/${item.user.username}`}>
                      <div className="flex cursor-pointer gap-x-2 items-center bg-[#1f1f22] px-4 py-2 rounded-lg hover:brightness-150 duration-300">
                        <FaEdit className="text-[#877EFF] " />
                        <button>Edit Profile</button>
                      </div>
                    </Link>
                  </div>
                  <div className="pt-4 flex gap-x-6 font-bold">
                    <div className="flex gap-x-1">
                      <span className="text-[#877EFF]">0</span>
                      <h1>Posts</h1>
                    </div>
                    <div className="flex gap-x-1">
                      <span className="text-[#877EFF]">
                        {item.user.followers}
                      </span>
                      <h1>Followers</h1>
                    </div>
                    <div className="flex gap-x-1">
                      <span className="text-[#877EFF]">
                        {item.user.following}
                      </span>
                      <h1>Following</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => handleSelect("Post")}
                  className={`${
                    isSelected === "Post" ? "bg-[#101012]" : "bg-[#09090A]"
                  } duration-300 hover:brightness-150 flex items-center gap-x-2 cursor-pointer rounded-l-lg px-16 text-sm font-bold py-4 w-fit `}
                >
                  <BsPostcard className="text-[#877EFF] text-2xl" />
                  <h1>Posts</h1>
                </div>
                <div
                  onClick={() => handleSelect("Liked_Post")}
                  className={`${
                    isSelected === "Liked_Post"
                      ? "bg-[#101012]"
                      : "bg-[#09090A]"
                  } duration-300 hover:brightness-150 flex gap-x-2 items-center cursor-not-allowed rounded-r-lg px-16 text-sm font-bold py-4 w-fit `}
                >
                  <CiHeart className="text-[#877EFF]  text-2xl" />
                  <h1>Liked Posts</h1>
                </div>
              </div>
              <div className="mt-12">
                {postSelected &&
                  item.posts.map((post) => (
                    <Post
                      handleLikes={handleLikes}
                      id={post.id}
                      photo={post.photo}
                      likes={post.likes}
                      bookmark={post.bookmarks}
                    />
                  ))}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
