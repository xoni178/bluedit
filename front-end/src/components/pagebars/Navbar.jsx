import { useState } from "react";
import { CreateButton } from "../buttons";

import Searchbar from "../Searchbar";

import { FancyButton } from "../buttons";
import BlueditLogo from "../../assets/img/bluedit.png";
import { ReactComponent as UserSvg } from "../../assets/svg/user.svg";

import { useBlueditDataContext } from "../../api/DataContext";
import ApiRequest from "../../api/ApiRequest";

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { authUser, SetAuthUser } = useBlueditDataContext();

  const [isActive, SetIsActive] = useState(false);

  const logout = (e) => {
    e.preventDefault();

    ApiRequest.get("/sanctum/csrf-cookie").then(() => {
      ApiRequest.post("/api/logout").then(() => {
        localStorage.removeItem("authUser");
        SetAuthUser(null);
        navigate("/");
      });
    });
  };

  return (
    <nav className="w-full h-[60px] bg-[#090e13] flex justify-between items-center border-[#192028] border-b px-5 fixed z-10 object-cover">
      <a
        className="w-[130px] h-full flex justify-center items-center "
        href="/"
      >
        <div className="w-full h-full flex justify-center items-center">
          <img
            className=" object-contain w-[80%] h-[80%]"
            src={BlueditLogo}
            alt="bluedit logo"
          />
        </div>
        <div>
          <p className="w-full h-full text-[#3278cd] font-bold text-xl">
            bluedit
          </p>
        </div>
      </a>
      <Searchbar />

      {authUser ? (
        <div>
          <div className="flex flex-row items-center gap-5 p-2">
            <CreateButton />
            <div className="hover:cursor-pointer">
              <div
                className="w-[32px] h-[32px]"
                onClick={() => SetIsActive((prev) => !prev)}
              >
                <UserSvg />
              </div>
            </div>
          </div>
          <div
            className={
              "absolute right-3 top-[60px] " + (isActive ? "block" : "hidden")
            }
          >
            <div className="w-[80px] h-[80px] flex flex-col justify-center items-center gap-5 bg-[#192028] rounded-lg p-3">
              <div>
                <a
                  href={"/users/" + authUser.username}
                  className="bg-transparent text-white text-sm hover:underline select-none"
                >
                  profile
                </a>
              </div>
              <div>
                <form action="/logout" method="POST">
                  <button
                    type="submit"
                    className="bg-transparent text-sm hover:underline"
                    onClick={(e) => logout(e)}
                  >
                    <p className="text-red-500 select-none">Logout</p>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FancyButton link="/login" slot="Login" />
      )}
    </nav>
  );
}
