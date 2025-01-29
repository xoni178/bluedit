import { useEffect, useState } from "react";

import { useBlueditDataContext } from "./api/DataContext";

import { Navbar, Sidebar } from "./components/pagebars";
import ExceptionsHandeler from "./components/exceptions/ExceptionsHandeler";
import SuccessHandeler from "./components/helpers/SuccessHandeler";
import Searchbar from "./components/Searchbar";

function App({ children }) {
  const { exception, SetException, SetAuthUser, success, SetSuccess } =
    useBlueditDataContext();
  const [isSearchDropdownActive, SetIsSearchDropdownActive] = useState(false);

  const startCountDown = (type) => {
    setTimeout(() => {
      if (type === "error") SetException(null);
      if (type === "success") SetSuccess(null);
    }, 4000);
  };

  const handlePopup = (type) => {
    startCountDown(type);
    if (type === "success")
      return <SuccessHandeler message={"Success: " + success} />;
    if (type === "error")
      return <ExceptionsHandeler message={"Error: " + exception} />;
  };

  return (
    <div className="h-fit">
      {exception ? handlePopup("error") : null}
      {success ? handlePopup("success") : null}
      <header>
        <Navbar />

        {isSearchDropdownActive ? (
          <div
            className={
              "w-full h-full fixed top-0 left-0 z-7 " +
              (isSearchDropdownActive ? "block" : "hidden")
            }
            onClick={() => SetIsSearchDropdownActive(false)}
          ></div>
        ) : null}

        <Searchbar
          SetIsSearchDropdownActive={(isActive) =>
            SetIsSearchDropdownActive(isActive)
          }
          isSearchDropdownActive={isSearchDropdownActive}
        />
      </header>

      <main className="h-fit flex flex-row">
        <div className="ml-[20%] mt-[70px] w-full flex items-center flex-col">
          {children}
        </div>
        <Sidebar />
      </main>
    </div>
  );
}

export default App;
