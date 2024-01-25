import { ReactElement } from "react";
import { TiHomeOutline } from "react-icons/ti";
import { MdExplore } from "react-icons/md";
import { FaPeopleArrows } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { MdPostAdd } from "react-icons/md";
export interface NavLinkProps {
  icon: ReactElement;
  title: string;
  linkTo: string;
}

export const navLinks: NavLinkProps[] = [
  {
    title: "Home",
    linkTo: "/",
    icon: <TiHomeOutline />,
  },
  {
    title: "Explore",
    linkTo: "/explore",
    icon: <MdExplore />,
  },
  {
    title: "People",
    linkTo: "/people",
    icon: <FaPeopleArrows />,
  },
  {
    title: "Saved",
    linkTo: "/saved",
    icon: <IoBookmarks />,
  },
  {
    title: "Create Post",
    linkTo: "/create-post",
    icon: <MdPostAdd />,
  },
];
