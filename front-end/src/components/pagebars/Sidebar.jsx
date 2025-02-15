import { LinkButton } from "../buttons";
import { ReactComponent as ArrowDownSvg } from "../../assets/svg/arrow-down.svg";

export default function Sidebar({
  SetcommunitiesDisplay,
  communitiesDisplay,
  subscribetCommunities,
  sideBarActive,
}) {
  return (
    <section
      className={`w-[300px] h-screen border-r-[1px] bg-[#090e13] border-[#192028] p-5 flex flex-col gap-10 overflow-scroll fixed top-[60px]  ${
        sideBarActive ? "translate-x-0" : "-translate-x-full"
      } `}
    >
      <div className="flex flex-col gap-2 border-b-[1px] border-[#192028] pb-5">
        <LinkButton type={"link"} slot={"Home"} />
      </div>
      <div className="flex flex-col gap-2 border-b-[1px] border-[#192028] pb-5">
        <button
          className="w-full h-[40px] bg-transparent hover:bg-[#192028] flex flex-row justify-between items-center gap-3 p-2 rounded text-gray-700 uppercase"
          onClick={() => SetcommunitiesDisplay((prev) => !prev)}
        >
          <p>Communities</p>
          <div className={communitiesDisplay ? "transform rotate-180" : ""}>
            <ArrowDownSvg />
          </div>
        </button>
        <div className="">
          <a
            href="/community/create"
            className="w-full h-[40px] bg-transparent hover:bg-[#192028] flex flex-row justify-start items-center gap-3 p-2 rounded"
          >
            <span>
              <svg
                fill="white"
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path>
              </svg>
            </span>
            <p className="text-white max-md:hidden">Create Community</p>
          </a>
        </div>

        {communitiesDisplay ? (
          <div className="flex flex-col gap-2">
            {subscribetCommunities
              ? subscribetCommunities.map((community, index) => {
                  return (
                    <LinkButton
                      key={index}
                      type={"community"}
                      slot={community?.name}
                      community={community}
                    />
                  );
                })
              : null}
            {subscribetCommunities?.length >= 30 ? (
              <button>Load More</button>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
