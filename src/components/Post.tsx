import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IoIosBookmark } from "react-icons/io";
interface PostProps {
  photo: string;
  likes?: number;
  bookmark?: number;
  handleLikes?: (value: number) => void;
  id: number;
  savedPost?: boolean;
  username?: string;
}

export default function Post(props: PostProps) {
  const { bookmark, likes, photo, handleLikes, id, savedPost, username } =
    props;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  function handleLoadIn() {
    setIsLoaded(true);
  }

  useEffect(() => {
    return () => {
      setIsLoaded(false);
    };
  }, []);

  return (
    <div className="relative rounded-3xl mb-4  w-full lg:w-[48%] xl:w-[30%] ">
      <img
        loading="lazy"
        className={`h-[300px] rounded-3xl w-full ${
          isLoaded ? "bg-gray-300 animate-pulse" : ""
        }  object-cover `}
        src={photo}
        onLoad={handleLoadIn}
        alt=""
      />
      <div className="absolute w-full h-full top-0 bg-gradient-to-t from-black to-transparent bg-opacity-60  z-50"></div>
      <div className="absolute flex items-center gap-x-4 bottom-10 left-6  text-white z-50">
        {savedPost ? (
          <div className="w-12 h-12 bg-blue-400 rounded-full flex justify-center items-center">
            {username?.slice(0, 1).toUpperCase()}
          </div>
        ) : (
          <>
            <div
              onClick={() => handleLikes && handleLikes(id)}
              className="flex items-center gap-x-2 cursor-pointer group "
            >
              <CiHeart className="text-lg group-hover:text-red-500 duration-300" />
              <h1>{likes}</h1>
            </div>
            <div className="flex items-center cursor-not-allowed gap-x-2">
              <CiBookmark className="text-lg " />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
