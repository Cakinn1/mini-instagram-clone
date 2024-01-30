import React, { ChangeEvent } from "react";
export default function TextInputs({
  onChangeValue,
  title,
  value,
  isInput,
  placeholder,
}: {
  title: string;
  onChangeValue: any
  value: string;
  isInput?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <h1 className="font-semibold">{title}</h1>
      {isInput ? (
        <input
          type={`${title === "Add Photos" ? "file" : 'text' }`}
          placeholder={placeholder}
          onChange={(e) => onChangeValue(e.target.value)}
          className="w-full placeholder:opacity-30   focus:outline-none rounded-lg py-3 px-4 focus:outline-[#7878a3] bg-[#1f1f22] resize-none"
        />
      ) : (
        <textarea
          onChange={(e) => onChangeValue(e.target.value)}
          value={value}
          placeholder="Add Caption"
          className="w-full placeholder:opacity-30  h-[140px]  focus:outline-none rounded-lg py-3 px-4 focus:outline-[#7878a3] bg-[#1f1f22] resize-none"

        ></textarea>
      )}
    </div>
  );
}
