import { useState, useEffect } from "react";
import { ReactComponent as SearchSvg } from "../assets/svg/search.svg";
import { ReactComponent as UserSvg } from "../assets/svg/user.svg";

import { throttle } from "lodash";

import ApiRequest from "../api/ApiRequest";

export default function Searchbar({
  SetSearchDropdownActive,
  searchDropdownActive,
}) {
  const [communitiesData, SetCommunitiesData] = useState(null);
  const [userData, SetUserData] = useState(null);

  //For every change on input value, make query the database
  const handleSearch = throttle((event) => {
    const search = event.target.value;
    if (search === "") {
      SetCommunitiesData(null);
      SetUserData(null);
      return;
    }

    ApiRequest.get("/api/search", {
      params: { search },
    })
      .then((searchData) => {
        console.log(searchData);

        SetCommunitiesData(searchData?.data?.communities);
        SetUserData(searchData?.data?.users);
      })
      .catch((err) => {
        console.error(err);
      });
  }, 1000);

  useEffect(() => {
    if (
      (communitiesData && communitiesData.length !== 0) ||
      (userData && userData.length !== 0)
    ) {
      SetSearchDropdownActive(true);
    } else {
      SetSearchDropdownActive(false);
    }
  }, [communitiesData, userData]);

  return (
    <div className="w-[300px]  max-sm:w-[120px] fixed flex flex-col h-fit z-20 top-[8px] mx-auto left-0 right-0">
      <div
        className={
          "w-full flex flex-row items-center gap-3 bg-[#090e13] border-[#192028] border-[1px] rounded-t-3xl pr-10 pl-5 py-2 " +
          (searchDropdownActive ? "" : "rounded-b-3xl")
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
            placeholder="Search Bluedit"
            className="w-full bg-transparent outline-none text-white"
          />
        </form>
      </div>

      <div
        className={
          "w-full absolute top-[40px] h-fit px-5 pb-5 pt-2 bg-[#090e13] border-[#192028] border-[1px] rounded-b-3xl " +
          (searchDropdownActive ? "block" : "hidden")
        }
      >
        {communitiesData ? (
          communitiesData.length !== 0 ? (
            <div className="w-full h-fit flex flex-col gap-3 mb-3">
              <p className="text-white">Communities</p>
              {communitiesData.map((community, index) => {
                return (
                  <a
                    key={index}
                    className="flex flex-row gap-2"
                    href={`/r/${community.name}`}
                  >
                    <div className="bg-[#192028] w-[32px] h-[32px] rounded-full"></div>
                    <p className="text-white">{community.name}</p>
                  </a>
                );
              })}
            </div>
          ) : null
        ) : null}

        {userData ? (
          userData.length !== 0 ? (
            <div className="w-full h-fit flex flex-col gap-3 mb-3">
              <p className="text-white">Users</p>
              {userData.map((user, index) => {
                return (
                  <a
                    key={index}
                    className="flex flex-row gap-2"
                    href={`/users/${user.username}`}
                  >
                    <div className="w-8 h-8">
                      <UserSvg />
                    </div>

                    <p className="text-white">{user.username}</p>
                  </a>
                );
              })}
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
}
