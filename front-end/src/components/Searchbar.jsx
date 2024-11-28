import { ReactComponent as SearchSvg } from "../assets/svg/search.svg";

export default function Searchbar() {
  return (
    <div className="flex flex-row items-center gap-3 border-[#192028] border-[1px] rounded-3xl pr-10 pl-5 py-2">
      <div className=" ">
        <SearchSvg />
      </div>
      <form>
        <input
          type="text"
          name="search"
          placeholder="Search Bluedit"
          className=" bg-transparent outline-none text-white"
        />
      </form>
    </div>
  );
}
