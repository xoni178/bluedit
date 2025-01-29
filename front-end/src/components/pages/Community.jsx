import { useState, useEffect } from "react";

import App from "../../App";
import { useParams, useNavigate } from "react-router";
import { useBlueditDataContext } from "../../api/DataContext";
import { CreateButton, FancyButton } from "../buttons";
import Post from "../Post";
import Loading from "../helpers/Loading";

import axios from "axios";

export default function Community() {
  const { community } = useParams();
  const { paginateNow, SetPaginateNow } = useBlueditDataContext();

  const navigate = useNavigate();
  const [isFirstRender, SetIsFirstRender] = useState(true);
  const [posts, SetPosts] = useState([]);
  const [links, SetLinks] = useState({});
  const [communityData, SetCommunityData] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  const HOST = process.env.REACT_APP_API_HOST;

  const getData = (nextLink = null) => {
    if (!nextLink) return;

    setShowMessage(false);

    axios
      .get(nextLink === "/" ? `${HOST}/api/r/${community}?page=1` : nextLink)
      .then((response) => {
        console.log(response);
        SetPosts((prevPosts) => [...prevPosts, ...response?.data?.posts]);
        SetLinks(response?.data?.links);
        SetCommunityData(response?.data?.community);

        if (posts.length === 0) {
          setShowMessage(true);
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

  return (
    <App>
      <section className="w-full flex flex-col items-center">
        <div className="w-[80%] h-[190px] relative  ">
          <div className="w-full h-[70%] bg-pink-300 rounded-xl"></div>
          <div className="flex flex-row justify-between pt-2">
            <div className="ml-[10%] ">
              <div className=" w-[88px] h-[88px] bg-gray-400 absolute bottom-3 left-6 rounded-full">
                <img src="" alt="" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {communityData?.name}
                </h1>
              </div>
            </div>
            <div className="flex flex-row gap-6">
              <CreateButton />
              <FancyButton />
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
                  onClick={() => navigate(`posts/${post.post_id}/${postTitle}`)}
                />
              );
            })
          )}
        </div>
      </section>
    </App>
  );
}
