import { useEffect, useState } from "react";

import { useBlueditDataContext } from "./api/DataContext";

import { Navbar, Sidebar } from "./components/pagebars";
import ExceptionsHandeler from "./components/exceptions/ExceptionsHandeler";
import SuccessHandeler from "./components/helpers/SuccessHandeler";
import Searchbar from "./components/Searchbar";

import ApiRequest from "./api/ApiRequest";

import UseWindowDimensions from "./components/helpers/UseWindowDimensions";

function App({ children }) {
  const { width } = UseWindowDimensions();

  const {
    exception,
    SetException,
    success,
    SetSuccess,
    imageToFullscreen,
    SetImageToFullscreen,
    authUser,
  } = useBlueditDataContext();

  const [searchDropdownActive, SetSearchDropdownActive] = useState(false);
  const [sideBarActive, SetSideBarActive] = useState(true);

  const [communitiesDisplay, SetcommunitiesDisplay] = useState(true);
  const [subscribetCommunities, SetsubscribetCommunities] = useState(null);

  useEffect(() => {
    if (authUser) {
      ApiRequest.get(`/api/user/${authUser?.username}/communities`)
        .then((response) => {
          console.log(response);
          SetsubscribetCommunities(response?.data?.data);
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            SetException(
              "Network Error: Check your internet connection or server."
            );
          }
          if (error.status >= 500) SetException("Server error");
          SetException(error.response?.data?.message);
        });
    }
  }, [authUser]);

  const startCountDown = (type) => {
    setTimeout(() => {
      if (type === "error") SetException(null);
      if (type === "success") SetSuccess(null);
    }, 10000);
  };

  const handlePopup = (type) => {
    startCountDown(type);
    if (type === "success")
      return (
        <SuccessHandeler
          message={"Success: " + success}
          SetException={(value) => SetSuccess(value)}
        />
      );
    if (type === "error")
      return (
        <ExceptionsHandeler
          message={"Error: " + exception}
          SetException={(value) => SetException(value)}
        />
      );
  };

  useEffect(() => {
    if (width <= 1024) {
      SetSideBarActive(false);
    } else {
      SetSideBarActive(true);
    }
  }, [width]);

  return (
    <div className="h-fit bg-[#090e13]">
      {imageToFullscreen ? (
        <div
          className="absolute bg-black bg-opacity-70 w-[100vw] h-[100vh] z-30 flex justify-center items-center"
          onClick={() => SetImageToFullscreen(null)}
        >
          <div className="w-3 h-3 rounded-full p-5 bg-red-500 flex justify-center items-center absolute top-11 right-3">
            <button
              className="text-white hover:cursor-pointer"
              onClick={() => SetImageToFullscreen(null)}
            >
              X
            </button>
          </div>
          <img
            src={imageToFullscreen}
            alt=""
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      ) : null}

      {exception ? handlePopup("error") : null}
      {success ? handlePopup("success") : null}
      <header>
        <Navbar SetSideBarActive={(value) => SetSideBarActive(value)} />

        {searchDropdownActive ? (
          <div
            className={
              "w-full h-full fixed top-0 left-0 z-7 " +
              (searchDropdownActive ? "block" : "hidden")
            }
            onClick={() => SetSearchDropdownActive(false)}
          ></div>
        ) : null}

        <Searchbar
          SetSearchDropdownActive={(isActive) =>
            SetSearchDropdownActive(isActive)
          }
          searchDropdownActive={searchDropdownActive}
        />
      </header>

      <main className="h-fit flex flex-row">
        <div className="ml-[290px] mt-[100px] w-full flex items-center flex-col max-lg:ml-0">
          {children}
        </div>

        <Sidebar
          SetcommunitiesDisplay={(value) => SetcommunitiesDisplay(value)}
          communitiesDisplay={communitiesDisplay}
          subscribetCommunities={subscribetCommunities}
          sideBarActive={sideBarActive}
        />
      </main>
    </div>
  );
}

export default App;
