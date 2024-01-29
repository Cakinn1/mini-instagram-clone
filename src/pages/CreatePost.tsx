import React, { useEffect, useState } from "react";
import { MdPostAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TextInputs from "../components/ui/TextInputs";

interface CreatePostProps {
  handleUpload: (value: number) => void;
  hashTagsInput: string[];
  locationInput: string;
  descriptionInput: string;
  setHashTagsInput: (value: string[]) => void;
  setDescriptionInput: (value: string) => void;
  setLocationInput: (value: string) => void;
  handleFileChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  fileImageUrl: File | null;
}

export default function CreatePost(props: CreatePostProps) {
  const {
    handleUpload,
    descriptionInput,
    hashTagsInput,
    locationInput,
    setDescriptionInput,
    setHashTagsInput,
    setLocationInput,
    handleFileChange,
    fileImageUrl,
  } = props;

  const navigate = useNavigate();
  return (
    <div className="text-white space-y-12 p-16 flex flex-1 flex-col">
      <div className="flex text-3xl  font-bold items-center gap-x-2">
        <MdPostAdd />
        <h1>Create Post</h1>
      </div>
      <TextInputs
        onChangeValue={setDescriptionInput}
        value={descriptionInput}
        title="Caption"
      />
      <div className="space-y-2">
        <h1 className="font-semibold">Add Photos</h1>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full focus:outline-none  rounded-lg py-2 px-4 focus:outline-[#7878a3] bg-[#1f1f22] h-[400px] resize-none"
        />
        {fileImageUrl && <img src={URL.createObjectURL(fileImageUrl)} alt="" />}
      </div>
      <TextInputs
        onChangeValue={handleFileChange}
        value={descriptionInput}
        title="Add Photos"
        isInput={true}
      />
      <TextInputs
        onChangeValue={setLocationInput}
        value={locationInput}
        title="Add Location"
        isInput={true}
        placeholder="Add Location"
      />
      {/* <TextInputs
        onChangeValue={setHashTagsInput}
        value={locationInput}
        title="Add Hashtags"
        isInput={true}
        placeholder={`Add Tags (seperated by comma ",")`}
      /> */}

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
          <button
            onClick={() => {
              handleUpload(1);
              navigate("/");
            }}
            className="bg-[#877Eff] px-6 hover:brightness-150 duration-300 py-3 rounded-md"
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}
