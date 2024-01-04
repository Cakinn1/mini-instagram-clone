import React from "react";
import { UserProps } from "../data/typings";
import Creators from "./Creators";

interface TopCreatorsProps {
  userData: UserProps[] | undefined;
  addFollowers: (value: string) => void;
}
export default function TopCreators(props: TopCreatorsProps) {
  const { userData, addFollowers } = props;
  console.log(userData);
  return (
    <div className="text-white xl:flex xl:flex-col p-6 hidden  border max-w-[460px] flex-1 border-[#1F1F22] bg-[#09090A]  overflow-y-auto ">
      <h1 className="font-bold text-3xl py-10 ">Top Creators</h1>
      <div className="flex flex-wrap gap-x-4">
        {userData?.slice(0, 12).map((data) => {
          return <Creators addFollowers={addFollowers} {...data} />;
        })}
      </div>
    </div>
  );
}
