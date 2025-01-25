import { Navbar, Sidebar } from "./components/pagebars";

import { useBlueditDataContext } from "./api/DataContext";
import { useEffect, useState } from "react";
import ExceptionsHandeler from "./components/exceptions/ExceptionsHandeler";
function App({ children }) {
  const { exception, SetException, SetAuthUser } = useBlueditDataContext();

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
