import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoIosBookmark } from "react-icons/io";
interface PostProps {
  photo: string;
  likes: number;
  bookmark: number;
  handleLikes: (value: number) => void;
  id: number;
}

export default function Post(props: PostProps) {
  const { bookmark, likes, photo, handleLikes, id } = props;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  function handleIsLoaded() {
    setIsLoaded(true);
  }
  return (
    <div className="relative rounded-3xl   w-fit">
      <img
        className={`h-[300px] rounded-3xl  w-[350px] object-cover ${
          isLoaded ? "bg-gray-300 animate-pulse" : ""
        }`}
        src={photo}
        onLoad={handleIsLoaded}
        alt=""
      />
      <div className="absolute w-full h-full top-0 bg-gradient-to-t from-black to-transparent bg-opacity-60  z-50"></div>
      <div className="absolute flex items-center gap-x-4 bottom-10 left-6  text-white z-50">
        <div
          onClick={() => handleLikes(id)}
          className="flex items-center gap-x-2 cursor-pointer group "
        >
          <CiHeart className="text-lg group-hover:text-red-500 duration-300" />
          <h1>{likes}</h1>
        </div>
        <div className="flex items-center gap-x-2">
          <CiBookmark className="text-lg" />
        </div>
      </div>
    </div>
  );
}
