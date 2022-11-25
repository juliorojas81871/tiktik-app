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
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <div className="hidden md:inline">
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
      </div>
      <div className="inline md:hidden">
        <Link href="/">
          <div className="w-[50px]">
            <Image
              className="cursor-pointer"
              src="/tiktik-icon.png"
              alt="logo"
              width={40}
              height={40}
              layout="responsive"
            />
          </div>
        </Link>
      </div>

      <div className="relative md:block">
        <form
          onSubmit={handleSearch}
          className="md:static md:top-10 -left-20 bg-white"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[200px] md:w-[350px] rounded-full md:top-0"
            // placeholder="Search accounts and videos"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
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
  );
};

export default Navbar;
