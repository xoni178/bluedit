import { Navbar, Sidebar } from "./components/pagebars";

import { useBlueditDataContext } from "./api/DataContext";
import { useEffect } from "react";
function App({ children }) {
  const { SetAuthUser } = useBlueditDataContext();

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("authUser"));
    SetAuthUser(info);
  }, []);

  return (
    <div className="h-fit">
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
