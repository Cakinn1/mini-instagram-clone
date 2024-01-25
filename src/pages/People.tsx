import React from "react";
import { MainProps, UserProps } from "../lib/typings";
import Creators from "../components/ui/Creators";

interface PeopleProps {
  mainData: MainProps;
  userData: UserProps[] | undefined;
  isLoading: boolean;
}
export default function People(props: PeopleProps) {
  const { mainData, userData, isLoading } = props;
  return (
    <div className="text-white flex-1 flex flex-col space-y-8 py-12 px-5 md:p-16">
      <h1 className="text-3xl font-bold">All Users</h1>
      <div className="flex flex-wrap gap-x-4">
        {isLoading &&
          new Array(12).fill(0).map((_, index: number) => {
            return (
              <div
                key={index}
                className="border-[#1F1F22] text-center text-white flex items-center flex-col space-y-4 border rounded-3xl p-6 min-h-[240px] mb-10 w-[47%] xl:w-[30%]"
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
        {userData?.map((data: UserProps) => {
          return (
            <Creators isPeopleTrue={true} isLoading={isLoading} {...data} />
          );
        })}
      </div>
    </div>
  );
}
