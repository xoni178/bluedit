import { useEffect, useState } from "react";

import { useBlueditDataContext } from "./api/DataContext";

import { Navbar, Sidebar } from "./components/pagebars";
import ExceptionsHandeler from "./components/exceptions/ExceptionsHandeler";
import Searchbar from "./components/Searchbar";

function App({ children }) {
  const { exception, SetException, SetAuthUser } = useBlueditDataContext();
  const [isSearchDropdownActive, SetIsSearchDropdownActive] = useState(false);

  const startCountDown = () => {
    setTimeout(() => {
      SetException(null);
    }, 5000);
  };

  const handleException = () => {
    startCountDown();
    return <ExceptionsHandeler message={"Error: " + exception} />;
  };

  return (
    <div className="h-fit">
      {exception ? handleException() : null}

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
