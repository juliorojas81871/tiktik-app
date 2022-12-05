import React, { useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { SuggestedAccounts, Footer, Discover } from "./";
import useAuthStore from '../store/authStore';
import { NextPage } from 'next';

const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);
  const { pathname } = useRouter();
  const { userProfile }: any = useAuthStore();
  const { fetchAllUsers, allUsers }: any = useAuthStore();


  const activeLink =
    "flex items-center gap-3 hover:bg-primary dark:hover:bg-gray-800 p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";

  const normalLink =
    "flex items-center gap-3 hover:bg-primary dark:hover:bg-gray-800 p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";
  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={pathname === "/" ? activeLink : normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="capitalize text-xl hidden xl:block">
                  For You
                </span>
              </div>
            </Link>
          </div>
          <div>
            {!userProfile && (
              <div className="px-2 py-4 hidden xl:block">
                <p className="text-gray-400">
                  Please log in to like and commit on video
                </p>
              </div>
            )}
            <Discover />
            <SuggestedAccounts
              fetchAllUsers={fetchAllUsers}
              allUsers={allUsers}
            />
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
