import React from "react";
import { UserProps } from "../../lib/typings";
import Creators from "../ui/Creators";

interface TopCreatorsProps {
  userData: UserProps[] | undefined;
  addFollowers: (value: string) => void;
  isLoading: boolean;
}
export default function TopCreators(props: TopCreatorsProps) {
  const { userData, addFollowers, isLoading } = props;
  return (
    <div className="text-white xl:flex xl:flex-col p-6 hidden  border max-w-[460px] flex-1 border-[#1F1F22] bg-[#09090A]  overflow-y-auto ">
      <h1 className="font-bold text-3xl py-10 ">Top Creators</h1>
      <div className="flex flex-wrap gap-x-4">
        {isLoading &&
          new Array(12).fill(0).map((_, index: number) => {
            return (
              <div
                key={index}
                className="border-[#1F1F22] text-center text-white flex items-center flex-col space-y-4 border rounded-3xl p-6 min-h-[240px] mb-10 w-full  2xl:w-[47%]"
              >
                <div className="max-w-16 w-full h-full max-h-16 text-2xl text-black rounded-full bg-gray-300 animate-pulse flex justify-center items-center"></div>
                <div className="space-y-3 text-sm ">
                  <h1 className="font-semibold bg-gray-300 animate-pulse w-[100px] h-4"></h1>
                  <p className="text-[#7878A3] bg-gray-300 animate-pulse w-[100px] h-4"></p>
                </div>
                <button className="bg-gray-300 animate-pulse w-[100px] h-10 hover:bg-opacity-30 duration-300 px-5 py-2 rounded-lg text-sm"></button>
              </div>
            );
          })}
        {userData?.slice(0, 12).map((data: UserProps) => {
          return (
            <Creators
              isLoading={isLoading}
              addFollowers={addFollowers}
              {...data}
            />
          );
        })}
      </div>
    </div>
  );
}
