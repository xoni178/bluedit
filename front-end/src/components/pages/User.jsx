import { useEffect, useState } from "react";
import App from "../../App";

import { Navbar, Sidebar } from "../pagebars";

import { useLocation } from "react-router-dom";

import ApiRequest from "../../api/ApiRequest";

import NotFound from "../exceptions/NotFound";
import Post from "../Post";

//svgs
import { ReactComponent as UserSvg } from "../../assets/svg/user.svg";

export default function User() {
  const [user, SetUser] = useState({});

  const location = useLocation();

  useEffect(() => {
    ApiRequest.get("/api" + location.pathname)
      .then((user) => {
        SetUser(user.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <App>
      <section className="w-full">
        <div className="w-full flex items-center flex-col">
          <div className="w-[60%] h-[200px] flex flex-row justify-center items-center gap-5">
            <div className="flex flex-row justify-center items-center gap-5">
              <div className="w-[64px] h-[64px]">
                <UserSvg />
              </div>
              <h1 className="text-white text-3xl">{user.username}</h1>
            </div>
            <div className="w-1/2 h-1/2 bg-black flex flex-row items-center p-5 rounded-lg">
              <div className="w-full text-white flex flex-col items-center">
                <p className="text-lg">{user.posts_karma}</p>
                <p className="text-sm text-gray-400">Post karma</p>
              </div>
              <div className="w-full text-white flex flex-col items-center">
                <p className="text-lg">{user.comments_karma}</p>
                <p className="text-sm text-gray-400">Comment karma</p>
              </div>
              <div className="w-full text-white flex flex-col items-center">
                <p className="text-lg ">{user.created_at}</p>
                <p className="text-sm text-gray-400">Cake day</p>
              </div>
            </div>
          </div>

          <div>
            <ul className="text-white flex flex-row gap-10">
              {/* <x-buttons.simple :active="request()->is('users/*')" link="/">Posts</x-buttons.simple>
                    <x-buttons.simple :active="request()->is('users//comments')" link="/">Comments</x-buttons.simple>
                    // <x-buttons.simple :active="request()->is('users//upvoted')" link="/">Upvoted</x-buttons.simple>
                    // <x-buttons.simple :active="request()->is('users//downvoted')" link="/">Downvoted</x-buttons.simple> */}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-14 items-center">
          {user.posts
            ? user.posts.map((post, index) => {
                return <Post key={index} post={post} />;
              })
            : null}
        </div>
      </section>
    </App>
  );
}
