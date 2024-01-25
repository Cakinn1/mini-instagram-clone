import React from "react";
import { MdPostAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface CreatePostProps {
  handleUpload: (value: number) => void;
}

export default function CreatePost(props: CreatePostProps) {
  const { handleUpload } = props;

  const navigate = useNavigate();
  return (
    <div className="text-white space-y-12 p-16 flex flex-1 flex-col">
      <div className="flex text-3xl  font-bold items-center gap-x-2">
        <MdPostAdd />
        <h1>Create Post</h1>
      </div>
      <div className="space-y-2">
        <h1 className="font-semibold">Caption</h1>
        <textarea
          name=""
          id=""
          className="w-full focus:outline-none rounded-lg py-2 px-4 focus:outline-[#7878a3] bg-[#1f1f22] h-[100px] resize-none"
        ></textarea>
      </div>
      <div className="space-y-2">
        <h1 className="font-semibold">Add Photos</h1>
        <textarea
          name=""
          id=""
          className="w-full focus:outline-none rounded-lg py-2 px-4 focus:outline-[#7878a3] bg-[#1f1f22] h-[100px] resize-none"
        ></textarea>
      </div>

      <div className="space-y-2">
        <h1 className="font-semibold">Add Location</h1>
        <input
          type="text"
          className="w-full focus:outline-none rounded-lg py-3 px-4 focus:outline-[#7878a3] bg-[#1f1f22] resize-none"
        />
      </div>

      <div className="space-y-2">
        <h1 className="font-semibold">Add Tags (seperated by comma ",")</h1>
        <input
          type="text"
          placeholder="Js, React, NextJS"
          className="w-full placeholder:opacity-30  focus:outline-none rounded-lg py-3 px-4 focus:outline-[#7878a3] bg-[#1f1f22] resize-none"
        />
      </div>

      <div className="flex gap-x-4 justify-end items-center">
        <div>
          <button
            onClick={() => navigate("/")}
            className="bg-[#1f1f22] px-6 hover:brightness-150 duration-300 py-3 rounded-md"
          >
            Cancel
          </button>
        </div>
        <div>
          <button onClick={() => handleUpload(1)} className="bg-[#877Eff] px-6 hover:brightness-150 duration-300 py-3 rounded-md">
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}
