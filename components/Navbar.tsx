import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin } from "@react-oauth/google";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import React, { useEffect, useState } from "react";
import { IUser } from "../types";
import { Dropdown } from "../components";

const Navbar = () => {
  const { userProfile, addUser } = useAuthStore();
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    // to prevent a full page reload
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center md:border-b-2 border-gray-200 py-2 px-4">
        <Link href="/">
          <div className="w-[100px] md:w-[129px]">
            <Image
              className="cursor-pointer"
              src="/tiktik-logo.png"
              alt="logo"
              width={100}
              height={30}
              layout="responsive"
            />
          </div>
        </Link>

        <div className="hidden md:inline md:relative ">
          <form
            onSubmit={handleSearch}
            className="static top-10 -left-20 bg-white dark:bg-[#0f1217]"
          >
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-primary dark:bg-gray-800 p-3 text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[350px] rounded-full top-0"
              placeholder="Search accounts and videos"
            />
            <button
              onClick={handleSearch}
              className="absolute  right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
            >
              <BiSearch />
            </button>
          </form>
        </div>
        <div>
          {user ? (
            <div className="flex gap-5 md:gap-10">
              <Link href="/upload">
                <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                  <IoMdAdd className="text-xl" />{" "}
                  <span className="hidden md:block">Upload </span>
                </button>
              </Link>
              <Dropdown user={user} />
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(response) => createOrGetUser(response, addUser)}
              onError={() => console.log("Login Failed")}
            />
          )}
        </div>
      </div>
      <div className="w-full flex md:hidden flex-col justify-center  items-center border-b-2 border-gray-200 py-2 px-4">
        <div className="relative">
          <form
            onSubmit={handleSearch}
            className="static -left-20 bg-white dark:bg-[#0f1217]"
          >
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-primary dark:bg-gray-800 p-3 font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[350px] rounded-full "
              placeholder="Search accounts and videos"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
            >
              <BiSearch />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
