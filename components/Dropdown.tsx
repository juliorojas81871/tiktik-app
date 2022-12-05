import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineDown } from "react-icons/ai";
import useAuthStore from "../store/authStore";
import Image from "next/image";
import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/router";
import { ThemeToggler } from "./";

const Dropdown = ({ user }: any) => {
  const { removeUser } = useAuthStore();
  const router = useRouter();

  const handleAccount = (e: { preventDefault: () => void }) => {
    // to prevent a full page reload
    e.preventDefault();
    router.push(`/profile/${user._id}`);
  };

  return (
    <div className="z-40">
      <Menu as="div">
        <Menu.Button className="-m-1 cursor-pointer items-center space-x-2 border border-gray-100 p-2 flex hover:bg-gray-100 dark:hover:bg-gray-800">
          {user.image && (
            <div>
              <Image
                className="h-5 w-5 rounded-full cursor-pointer"
                src={user.image}
                alt="user"
                width={40}
                height={40}
              />
            </div>
          )}
          <div className="flex-1 text-xs hidden md:inline">
            <p>Welcome</p>
            <p className="truncate">{user.userName}</p>
          </div>
          <AiOutlineDown className="h-2 md:h-5 text-gray-400" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute dark:bg-[#0f1217] bg-white md:w-36 mt-2 origin-top-right divide-y divide-gray-100 rounded-sm shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-gray-100 dark:bg-gray-800" 
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide cursor-default`}
                    onClick={() => {
                      googleLogout();
                      removeUser();
                    }}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-gray-100 dark:bg-gray-800"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide cursor-default`}
                    onClick={handleAccount}
                  >
                    Account
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 flex flex-col justify-center items-center">
              <Menu.Item>
                <ThemeToggler />
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
