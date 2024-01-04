import React from "react";
import { UserProps } from "../data/typings";
import { NavigationType, useNavigate } from "react-router-dom";

interface CreatorsProps extends UserProps {
  addFollowers?: (value: string) => void;
  isLoading: boolean;
  isPeopleTrue?: boolean;
}

export default function Creators(props: CreatorsProps) {
  const {
    avatar,
    bio,
    followers,
    following,
    location,
    name,
    username,
    addFollowers,
    isLoading,
    isPeopleTrue,
  } = props;

  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <div
          onClick={() => navigate(`/profile/${username}`)}
          className={`border-[#1F1F22] cursor-pointer text-center text-white flex items-center flex-col space-y-4 border rounded-3xl p-6 min-h-[240px] mb-10 ${
            isPeopleTrue ? "w-[47%] xl:w-[30%]" : " w-full  2xl:w-[47%]"
          }`}
        >
          <div className="max-w-16 w-full h-full max-h-16 text-2xl text-black rounded-full bg-blue-400 flex justify-center items-center">
            A
          </div>
          <div className="space-y-1 text-sm ">
            <h1 className="font-semibold">@{username.split("_")[0]}</h1>
            <p className="text-[#7878A3]">{location}</p>
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-[#877eff] hover:bg-opacity-30 duration-300 cursor-not-allowed px-5 py-2 rounded-lg text-sm"
          >
            Follow
          </button>
        </div>
      )}
    </>
  );
}
