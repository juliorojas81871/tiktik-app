import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[129px] ">
          <Image
            className="cursor-pointer"
            src='/tiktik-logo.png'
            alt="logo"
            width={100}
            height={30}
            layout="responsive"
          />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
