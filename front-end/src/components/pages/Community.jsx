import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router";
import { useBlueditDataContext } from "../../api/DataContext";
import { CreateButton } from "../buttons";
import Post from "../Post";
import Loading from "../helpers/Loading";

import axios from "axios";
import ApiRequest from "../../api/ApiRequest";

import UseWindowDimensions from "../helpers/UseWindowDimensions";

export default function Community() {
  const { width } = UseWindowDimensions();

  const { community } = useParams();
  const { paginateNow, SetPaginateNow } = useBlueditDataContext();

  const navigate = useNavigate();
  const [isFirstRender, SetIsFirstRender] = useState(true);
  const [posts, SetPosts] = useState([]);
  const [links, SetLinks] = useState(null);
  const [communityData, SetCommunityData] = useState(null);

  const [isSubscribed, SetIsSubscribed] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const HOST = process.env.REACT_APP_API_HOST;

  const getData = (nextLink = null) => {
    if (!nextLink) {
      setShowMessage(true);
      return;
    }

    setShowMessage(false);

    axios
      .get(nextLink === "/" ? `${HOST}/api/r/${community}?page=1` : nextLink, {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        SetPosts((prevPosts) => [...prevPosts, ...response?.data?.posts]);
        SetLinks(response?.data?.links);
        SetCommunityData(response?.data?.community);

        if (response?.data?.posts.length === 0) {
          setShowMessage(true);
        }
        if (response?.data?.community?.isSubscribed) {
          SetIsSubscribed(true);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (isFirstRender) {
      getData("/");
      SetIsFirstRender(false);
    }

    if (paginateNow) {
      getData(links.next);
      SetPaginateNow(false);
    }
  }, [paginateNow]);

  const handleSubscription = () => {
    ApiRequest.get("/sanctum/csrf-cookie").then(() => {
      ApiRequest.post(`api/user/community/${community}/join`)
        .then((response) => {
          if (response.status === 200) {
            SetIsSubscribed(true);
          }
        })
        .catch((err) => console.error(err));
    });
  };

  const handleUnSubscription = () => {
    ApiRequest.get("/sanctum/csrf-cookie").then(() => {
      ApiRequest.post(`api/user/community/${community}/leave`)
        .then((response) => {
          if (response.status === 200) {
            SetIsSubscribed(false);
          }
        })
        .catch((err) => console.error(err));
    });
  };

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-[80%] h-[190px] relative  ">
        <div className="w-full h-[70%] bg-pink-300 rounded-xl">
          {communityData?.banner_url ? (
            <img
              src={`${HOST}${communityData?.banner_url}`}
              alt="banner"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : null}
        </div>
        <div className="flex flex-row justify-between pt-2">
          <div className="ml-[10%] ">
            <div className=" w-[88px] h-[88px] max-sm:w-[52px] max-sm:h-[52px] max-sm:absolute max-sm:bottom-12 bg-gray-400 absolute bottom-3 left-6 rounded-full">
              {communityData?.icon_url ? (
                <img
                  src={`${HOST}${communityData?.icon_url}`}
                  alt="icon"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : null}
            </div>
            <div>
              <h1
                className={`text-3xl font-bold text-white max-sm:ml-0 ${
                  width >= 1310
                    ? width <= 1720 && width > 640
                      ? "ml-7"
                      : ""
                    : "ml-16"
                }`}
              >
                {communityData?.name}
              </h1>
            </div>
          </div>
          <div className="flex flex-row gap-6">
            <CreateButton community={communityData?.name} />
            {isSubscribed ? (
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleUnSubscription()}
              >
                Joined
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleSubscription()}
              >
                Join
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5  mt-14">
        {posts.length === 0 ? (
          showMessage ? (
            <div className="flex justify-center items-center h-[50vh]">
              <h1 className="text-white text-3xl">No posts to show</h1>
            </div>
          ) : (
            <Loading />
          )
        ) : (
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                post={post}
                displayUsername={false}
                onClick={() =>
                  navigate(`/posts/${post.post_id}`, {
                    replace: true,
                  })
                }
              />
            );
          })
        )}

        {posts.length !== 0 ? (
          showMessage ? (
            <div className="flex justify-center items-center h-[100px]">
              <h1 className="text-white text-xl">No more posts to show</h1>
            </div>
          ) : (
            <Loading />
          )
        ) : null}
      </div>
    </section>
  );
}
