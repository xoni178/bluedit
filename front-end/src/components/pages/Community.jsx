import { useState, useEffect } from "react";

import App from "../../App";
import { useParams, useNavigate } from "react-router";
import { useBlueditDataContext } from "../../api/DataContext";
import { CreateButton } from "../buttons";
import Post from "../Post";
import Loading from "../helpers/Loading";

import axios from "axios";
import ApiRequest from "../../api/ApiRequest";

export default function Community() {
  const { community } = useParams();
  const { paginateNow, SetPaginateNow } = useBlueditDataContext();

  const navigate = useNavigate();
  const [isFirstRender, SetIsFirstRender] = useState(true);
  const [posts, SetPosts] = useState([]);
  const [links, SetLinks] = useState({});
  const [communityData, SetCommunityData] = useState("");

  const [isSubscribed, SetIsSubscribed] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const HOST = process.env.REACT_APP_API_HOST;

  const getData = (nextLink = null) => {
    if (!nextLink) return;

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
    console.log(paginateNow);
    if (paginateNow) {
      getData(links.next);
      SetPaginateNow(false);
    }
  }, [paginateNow]);

  const handleSubscription = () => {
    ApiRequest.post(`api/community/join`, {
      community_name: communityData.name,
    })
      .then((response) => {
        if (response.status === 200) {
          SetIsSubscribed(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleUnSubscription = () => {
    ApiRequest.post(`api/community/leave`, {
      community_name: communityData.name,
    })
      .then((response) => {
        if (response.status === 200) {
          SetIsSubscribed(false);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <App>
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
              <div className=" w-[88px] h-[88px] bg-gray-400 absolute bottom-3 left-6 rounded-full">
                {communityData?.icon_url ? (
                  <img
                    src={`${HOST}${communityData?.icon_url}`}
                    alt="icon"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : null}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
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
              const postTitle = post.title.replaceAll(" ", "_");

              return (
                <Post
                  key={index}
                  post={post}
                  displayUsername={false}
                  onClick={() =>
                    navigate(`/posts/${post.post_id}/${postTitle}`, {
                      replace: true,
                    })
                  }
                />
              );
            })
          )}

          {posts && posts.length > 0 && showMessage ? (
            <div className="flex justify-center items-center h-[50vh]">
              <h1 className="text-white text-3xl">No more posts to show</h1>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </section>
    </App>
  );
}
