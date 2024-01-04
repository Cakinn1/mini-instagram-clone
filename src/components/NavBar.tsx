import React, { ReactElement, useState } from "react";
import { MainProps } from "../data/typings";
import { Link } from "react-router-dom";
import { NavLinkProps, navLinks } from "../data/constants";
import { CiLogout } from "react-icons/ci";
interface NavBarProps {
  mainData: MainProps | null;
}
export default function NavBar(props: NavBarProps) {
  const { mainData } = props;
  const [isSelected, setIsSelected] = useState<string>("Home");

  function handleSelect(value: string) {
    if (value === isSelected) {
      setIsSelected("");
    } else {
      setIsSelected(value);
    }
  }

  return (
    <div className="w-[280px] hidden md:flex  text-white  ">
      <div className="fixed px-4 space-y-8  max-w-[280px] bg-[#09090A] h-full w-full   flex  flex-col">
        <div className=" w-full ">
          <Link to="/">
          <img src="/logo.svg" className="my-8" alt="" />
          </Link>
          <div className="flex gap-x-3 items-center">
            <div className="bg-blue-400 text-black uppercase w-12 h-12 rounded-full flex justify-center items-center text-2xl">
              {mainData?.user?.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h1 className="font-bold">{mainData?.user?.name}</h1>
              <h2 className="text-[#7878a3] text-sm">
                {mainData?.user?.username}
              </h2>
            </div>
          </div>
        </div>
        <div className="space-y-6 w-full">
          {navLinks.map((link) => {
            return (
              <NavList
                isSelected={isSelected}
                handleSelect={handleSelect}
                key={link.title}
                title={link.title}
                icon={link.icon}
                linkTo={link.linkTo}
              />
            );
          })}
        </div>
        <div className="flex h-full">
          <div className="mt-auto p-4 flex w-fit cursor-pointer items-center gap-x-4 mb-10">
            <CiLogout className="text-[#877eff] text-2xl" />
            <h1>Logout</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavListProp extends NavLinkProps {
  handleSelect: (value: string) => void;
  isSelected: string;
}

function NavList(props: NavListProp) {
  const { icon, linkTo, title, handleSelect, isSelected } = props;

  return (
    <Link
      onClick={() => handleSelect(title)}
      className={`${
        title === isSelected ? "bg-[#877eff] group" : ""
      } flex hover:bg-[#877eff] group items-center duration-300 p-4 rounded-md  gap-x-4`}
      to={`${linkTo}`}
    >
      <p
        className={`${
          title === isSelected ? "text-white" : "text-[#877eff]"
        } text-2xl  duration-300 group-hover:text-white`}
      >
        {icon}
      </p>
      <h1 className="font-semibold text-white">{title}</h1>
    </Link>
  );
}
