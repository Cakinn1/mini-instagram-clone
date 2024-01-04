import React from "react";
import { MainProps } from "../data/typings";

interface ExploreProps {
  mainData: MainProps;
}

export default function Explore(props: ExploreProps) {
  const { mainData } = props;
  return (
    <div className="p-16 space-y-8 text-white">
        <h1 className="text-3xl font-bold">Search Posts</h1>
        <div>
            <input type="text" />
        </div>
        <div>
d
        </div>
    </div>
  );
}
