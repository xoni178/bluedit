import { useEffect, useState } from "react";
import { ReactComponent as SearchSvg } from "../assets/svg/search.svg";

import { throttle } from "lodash";

import ApiRequest from "../api/ApiRequest";

export default function CommunitySelector({
  setSelectedCommunity,
  selectedCommunity,
}) {
  const [communitiesData, SetCommunitiesData] = useState(null);
  const [search, SetSearch] = useState("");
  const HOST = process.env.REACT_APP_API_HOST;

  //For every change on input value, make query the database
  const handleSearch = throttle((searchQuery) => {
    SetSearch(searchQuery);
    setSelectedCommunity(null);

    if (searchQuery === "") {
      SetCommunitiesData(null);
      return;
    }

    ApiRequest.get("/api/search", {
      params: { search: searchQuery },
    })
      .then((response) => {
        console.log(response);

        SetCommunitiesData(response?.data?.communities);
      })
      .catch((err) => {
        console.error(err);
      });
  }, 1000);

  const handleCommunitySelect = (community) => {
    if (typeof community === "string" || community instanceof String) {
      ApiRequest.get("/api/search", {
        params: { find: community, s: "sss" },
      })
        .then((response) => {
          console.log(response);
          setSelectedCommunity(response?.data?.communities);
          SetSearch(response?.data?.communities?.name);
          SetCommunitiesData(null);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setSelectedCommunity(community);
      SetSearch(community.name);
      SetCommunitiesData(null);
    }
  };

  useEffect(() => {
    if (
      selectedCommunity &&
      (typeof selectedCommunity === "string" ||
        selectedCommunity instanceof String)
    ) {
      handleCommunitySelect(selectedCommunity);
    }
  }, []);

  return (
    <div className="flex flex-col h-fit relative">
      <div
        className={
          "flex flex-row items-center gap-3 border-[#192028] border-[1px] rounded-t-3xl pr-10 pl-5 py-2 " +
          (communitiesData ? "" : "rounded-b-3xl")
        }
      >
        <div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            {selectedCommunity ? (
              selectedCommunity?.icon_url ? (
                <a
                  className="w-full h-full rounded-full"
                  rel="noreferrer"
                  target="_blank"
                  href={`/r/${selectedCommunity.name}`}
                >
                  <img
                    src={HOST + selectedCommunity.icon_url}
                    alt="icon"
                    className="w-full h-full object-cover rounded-full"
                  />
                </a>
              ) : null
            ) : (
              <SearchSvg />
            )}
          </div>
        </div>
        <form method="GET">
          <input
            onChange={(event) => handleSearch(event.target.value)}
            type="text"
            name="search"
            placeholder="Select Community"
            className=" bg-transparent outline-none text-white"
            value={search}
            required
          />
        </form>
      </div>
      <div
        className={
          "w-full h-fit absolute px-5 pt-2 top-[40px] bg-[#090e13] border-[#192028] border-[1px] rounded-b-3xl " +
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
                    className="flex flex-row gap-2 hover:bg-[#192028] p-2 rounded-lg cursor-pointer"
                    onClick={() => handleCommunitySelect(community)}
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
