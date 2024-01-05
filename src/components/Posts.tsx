import React from "react";
import { ResultsProps, SinglePostProps } from "../data/typings";
import { FaBook, FaRegHeart } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
interface PostsProps extends SinglePostProps {
  handleLikes: (value: number) => void;
  addBookmark: (value: number) => void;
  bookmark: PostsProps[];
  isLoading: boolean;
}

export default function Posts(props: PostsProps) {
  const {
    bookmarks,
    date,
    description,
    hashtags,
    id,
    likes,
    location,
    photo,
    // user,
    handleLikes,
    addBookmark,
    bookmark,
    isLoading,
  } = props;

  // const itemExistsAlready: ResultsProps | undefined = bookmark.find((item: ResultsProps) => {
  //   return item.id === id;
  // });

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <div className="border space-y-4 h-[600px] border-[#1F1F22] bg-[#09090A] p-6 mb-8 rounded-3xl">
          <Link
            to={`/profile/${user.username}/`}
            className="flex gap-x-2 items-center"
          >
            {/* <img src="" alt="" /> */}
            <div className="bg-blue-400 text-black text-lg rounded-full h-12 w-12 flex justify-center items-center">
              {user.username.slice(0, 1).toUpperCase()}
            </div>
            <div className="space-y-1">
              <h1>@{user.username}</h1>
              <div className="flex items-center gap-x-2 text-[#7878a3] text-sm">
                <p className="">{date}</p>
                <div className="w-1 h-1 bg-[#7878a3] rounded-full"></div>
                <p>username</p>
              </div>
            </div>
          </Link>
          <Link to={`/profile/${user.username}`}>
            <div className="space-y-2 text-[14px]">
              <h1 className="mt-2">{description}</h1>
              <div className="flex flex-wrap gap-x-2">
                {hashtags.map((tag: string) => {
                  return <h2 className="text-[#7878a3]">{tag}</h2>;
                })}
              </div>
            </div>
          </Link>
          <Link to={`/profile/${user.username}`}>
            <div className="flex mt-3 flex-grow max-h-[60%] h-full overflow-hidden ">
              <img
                className="object-cover rounded-3xl w-full h-full"
                src={photo}
                alt=""
              />
            </div>
          </Link>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="flex h-14 justify-between items-center"
          >
            <div
              onClick={() => handleLikes(id)}
              className="flex items-center cursor-pointer w-fit group gap-x-2"
            >
              <FaRegHeart className="text-lg text-[#877eff] duration-300 group-hover:text-red-500" />
              <h1 className="text-sm">{likes}</h1>
            </div>
            <div
              onClick={() => addBookmark(id)}
              className="flex items-center cursor-pointer group duration-300 gap-x-2"
            >
              {/* {itemExistsAlready ? (
                <>
                  <FaBookmark className=" text-[#877eff] group-hover:text-" />
                  <h1>{bookmarks}</h1>
                </>
              ) : (
                <>
                  <CiBookmark className="text-lg  text-[#877eff] group-hover:text-" />
                  <h1>{bookmarks}</h1>
                </>
              )} */}
            </div>
          </form>
        </div>
      )}
    </>
  );
}
