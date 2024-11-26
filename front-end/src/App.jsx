import { Navbar, Sidebar } from "./components/pagebars";
import { HomePage } from "./components/pages";

function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="h-screen flex flex-row">
        <div className="ml-[20%] mt-[70px] w-full flex items-center flex-col">
          <HomePage />
        </div>
        <Sidebar />
      </main>
    </div>
  );
}

export default App;
