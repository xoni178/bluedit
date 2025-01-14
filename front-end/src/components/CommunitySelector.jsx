import { useEffect, useState } from "react";
import { ReactComponent as SearchSvg } from "../assets/svg/search.svg";
import { ReactComponent as UserSvg } from "../assets/svg/user.svg";

import { throttle } from "lodash";

import ApiRequest from "../api/ApiRequest";

export default function CommunitySelector({
  setSelectedCommunity,
  selectedCommunity,
}) {
  const [communitiesData, SetCommunitiesData] = useState();

  //For every change on input value, make query the database
  const handleSearch = throttle((event) => {
    const search = event.target.value;
    if (search === "") {
      SetCommunitiesData(null);
      return;
    }

    ApiRequest.get("/api/search", {
      params: { search },
    })
      .then((searchData) => {
        console.log(searchData);

        SetCommunitiesData(searchData?.data?.communities);
      })
      .catch((err) => {
        console.error(err);
      });
  }, 1000);

  return (
    <div className="flex flex-col h-fit relative">
      <div
        className={
          "flex flex-row items-center gap-3 border-[#192028] border-[1px] rounded-t-3xl pr-10 pl-5 py-2 " +
          (communitiesData ? "" : "rounded-b-3xl")
        }
      >
        <div className=" ">
          <SearchSvg />
        </div>
        <form method="GET">
          <input
            onChange={(event) => handleSearch(event)}
            type="text"
            name="search"
            placeholder="Select Community"
            className=" bg-transparent outline-none text-white"
            value={selectedCommunity}
          />
        </form>
      </div>
      <div
        className={
          "w-full h-fit absolute px-5 pb-5 pt-2 top-[40px] bg-[#090e13] border-[#192028] border-[1px] rounded-b-3xl " +
          (communitiesData ? "block" : "hidden")
        }
      >
        {communitiesData ? (
          communitiesData.length !== 0 ? (
            <div className="w-full h-fit flex flex-col gap-3 mb-3">
              {communitiesData.map((community, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row gap-2"
                    onClick={() => setSelectedCommunity(community)}
                  >
                    <div className="bg-[#192028] w-[32px] h-[32px] rounded-full"></div>
                    <p className="text-white">{community.name}</p>
                  </div>
                );
              })}
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
}
