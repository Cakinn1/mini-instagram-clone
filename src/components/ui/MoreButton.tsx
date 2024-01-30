import React, { Dispatch } from "react";

interface MoreButtonProps {
  lastIndex: number;
  num: number;
  isLoading: boolean;
  setLastIndex: Dispatch<React.SetStateAction<number>>;
  btnText: string
}
export default function MoreButton(props: MoreButtonProps) {
  const { isLoading, lastIndex, num, setLastIndex, btnText } = props;
  return (
    <>
      {lastIndex <= num && !isLoading && (
        <button
          className=" px-8 py-2 rounded-md bg-[#877eff] hover:scale-105 active:scale-90 duration-300"
          onClick={() => {
            setLastIndex((prevIndex) => prevIndex + 6);
          }}
        >
          {btnText}
        </button>
      )}
    </>
  );
}
