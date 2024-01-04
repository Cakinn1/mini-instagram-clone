import React from "react";
import { MainProps, ResultsProps, UserProps } from "../data/typings";
import Posts from "./Posts";
import TopCreators from "./TopCreators";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";

interface FeedProps {
  mainData: MainProps;
  setMainData: (value: MainProps) => void;
  addBookmark: (value: number) => void;
  bookmark: ResultsProps[];
  userData: UserProps[] | undefined;
  addFollowers: (value: string) => void;
  isLoading: boolean;
}
export default function Feed(props: FeedProps) {
  const {
    mainData,
    setMainData,
    addBookmark,
    bookmark,
    addFollowers,
    userData,
    isLoading,
  } = props;

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
      <div className="lg:p-16 space-y-8 overflow-y-scroll py-16 2xl:px-0 px-4  flex-1 lg:max-w-[700px] w-full text-white flex-col flex 2xl:max-w-[800px]">
        <h1 className="font-bold text-3xl px-2">Home Feed</h1>
        <div>
          {isLoading &&
            new Array(10).fill(0).map((_, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="border space-y-4 h-[600px] border-[#1F1F22] bg-[#09090A] p-6 mb-8 rounded-3xl"
                >
                  <Link to="/" className="flex gap-x-2 items-center">
                    {/* <img src="" alt="" /> */}
                    <div className="bg-gray-300 animate-pulse text-black text-lg rounded-full h-12 w-12 flex justify-center items-center"></div>
                    <div className="space-y-1">
                      <h1 className="bg-gray-300 animate-pulse h-4 w-[180px]"></h1>
                      <div className="flex items-center gap-x-2 text-[#7878a3] text-sm">
                        <p className="bg-gray-300 animate-pulse h-4 w-24"></p>
                        {/* <div className="w-1 h-1 bg-[#7878a3] rounded-full"></div> */}
                        <p className="bg-gray-300 animate-pulse h-4 w-full"></p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/">
                    <div className="space-y-2 text-[14px]">
                      <div className="flex flex-wrap gap-x-2">
                        <h2 className="bg-gray-300 mt-4  animate-pulse h-4 w-[50%]"></h2>
                        <h2 className="bg-gray-300 mt-4  animate-pulse h-4 w-[50%]"></h2>
                      </div>
                    </div>
                  </Link>
                  <Link to="/">
                    <div className="flex mt-3 flex-grow max-h-[60%] h-full overflow-hidden ">
                      <div className="object-cover bg-gray-300 animate-pulse rounded-3xl w-full h-full"></div>
                    </div>
                  </Link>
                  <form
                    onSubmit={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    className="flex h-14 justify-between items-center"
                  >
                    <div className="flex items-center cursor-pointer w-fit group gap-x-2">
                      <div className="text-lg object-cover bg-gray-300 h-8 w-16 animate-pulse  duration-300 group-hover:text-red-500"></div>
                    </div>
                    <div className="flex items-center cursor-pointer group duration-300 gap-x-2">
                      <div className="bg-gray-300 h-8 w-16 animate-pulse"></div>
                    </div>
                  </form>
                </div>
              );
            })}

          {mainData.results?.map((data) => {
            return (
              <Posts
                isLoading={isLoading}
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
      <TopCreators isLoading={isLoading} addFollowers={addFollowers} userData={userData} />
    </>
  );
}
