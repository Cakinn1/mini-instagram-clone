import { ResultsProps, SinglePostProps } from "../data/typings";
import Post from "./Post";
import { IoIosBookmark } from "react-icons/io";

interface BookmarkProps {
  bookmark: SinglePostProps[];
}
export default function Bookmarks(props: BookmarkProps) {
  const { bookmark } = props;
  return (
    <div className="text-white space-y-12 py-16 px-4  md:p-16 w-full">
      <div className="text-3xl flex gap-x-2 items-center  font-bold">
        <IoIosBookmark />
        <h1>Saved Posts</h1>
      </div>
      <div className="flex flex-wrap gap-x-6">
        {bookmark.length > 0 ? (
          bookmark.map((item) => {
            return (
              <Post
                username={item.user.username}
                photo={item.photo}
                id={item.id}
                savedPost={true}
              />
            );
          })
        ) : (
          <div className="flex w-full justify-center items-center">
            <p className="text-[#5c5c7b] text-lg">No available posts</p>
          </div>
        )}
      </div>
    </div>
  );
}
