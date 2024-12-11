import { useState } from "react";

// react icons

import { IoIosArrowUp } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { CiMenuFries } from "react-icons/ci";
import { MdLaptopMac } from "react-icons/md";

import { AiOutlineFire } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUserData } from "../hook/useUserData";
const Header = () => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const { data: user, isLoading, refetch } = useUserData();
  if (isLoading) return <h1>Loading</h1>;
  if (isLoading) {
    return <p>Loading...</p>; // Show loading state
  }
  console.log(user);
  const handleLogout = () => {
    logout();
    refetch();
  };
  return (
    <nav className="flex items-center justify-between relative container mx-auto py-2">
      <img src="/logo.png" alt="logo" className="w-[55px] " />
      <ul className="items-center gap-[20px] text-[1rem] text-[#424242] lg:flex hidden">
        <li className={` flex items-center gap-[5px] cursor-pointer`}>
          <MdLaptopMac className="text-[1.1rem]" />
          Products
        </li>

        <li className="flex items-center gap-[5px] cursor-pointer">
          <Link to={"/lessons"}>
            <AiOutlineFire className="text-[1.1rem] text-gray-600" />
            Lessons
          </Link>
        </li>
        <li className="flex items-center gap-[5px] cursor-pointer">
          <BiSupport className="text-[1.1rem] text-gray-600" />
          Support
        </li>
      </ul>

      {user ? (
        <div className="flex items-center gap-[15px]">
          <div
            className="flex items-center gap-[10px] cursor-pointer relative"
            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
          >
            <div className="relative">
              <img
                src="user?.image"
                alt="avatar"
                className="w-[35px] h-[35px] rounded-full object-cover"
              />
              <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
            </div>

            <h1 className="text-[1rem] font-[400] text-gray-600 sm:block hidden">
              {user?.name}
            </h1>

            <div
              className={`${
                accountMenuOpen
                  ? "translate-y-0 opacity-100 z-[1]"
                  : "translate-y-[10px] opacity-0 z-[-1]"
              } bg-white w-max rounded-md boxShadow absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
            >
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <FiUser />
                View Profile
              </p>
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <IoSettingsOutline />
                Settings
              </p>
              <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                <FiUser />
                View Profile
              </p>

              <div className="mt-3 border-t border-gray-200 pt-[5px]">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50"
                >
                  <TbLogout2 />
                  Logout
                </button>
              </div>
            </div>

            <IoIosArrowUp
              className={`${
                accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
              } transition-all duration-300 text-gray-600 sm:block hidden`}
            />
          </div>

          <CiMenuFries
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="text-[1.8rem] text-[#424242]c cursor-pointer lg:hidden flex"
          />
        </div>
      ) : (
        <Link to={"/login"}>
          <button className="bg-blue-600 text-white py-2 px-4 rounded font-semibold">
            Login
          </button>
        </Link>
      )}

      <aside
        className={` ${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "translate-x-[200px] opacity-0 z-[-1]"
        } lg:hidden bg-white boxShadow p-4 text-center absolute top-[55px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300`}
      >
        <ul className="items-start gap-[20px] text-[1rem] text-gray-600 flex flex-col">
          <li className="hover:text-[#3B9DF8] group transition-all duration-500 cursor-pointer capitalize flex items-center gap-[10px]">
            Products
          </li>

          <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-poin ter capitalize">
            Features
          </li>
          <li className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer capitalize">
            Support
          </li>
        </ul>
      </aside>
    </nav>
  );
};

export default Header;
