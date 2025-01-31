import { useEffect, useState } from "react";

import axios from "axios";

import Post from "../Post";
import App from "../../App";
import Loading from "../helpers/Loading";

//context
import { useBlueditDataContext } from "../../api/DataContext";

import { useNavigate } from "react-router";

export default function Home() {
  const { paginateNow, SetPaginateNow } = useBlueditDataContext();

  const navigate = useNavigate();
  const [isFirstRender, SetIsFirstRender] = useState(true);
  const [posts, SetPosts] = useState([]);
  const [links, SetLinks] = useState({});

  const [showMessage, setShowMessage] = useState(false);

  const HOST = process.env.REACT_APP_API_HOST;

  const getData = (nextLink = null) => {
    if (!nextLink) return;

    setShowMessage(false);

    axios
      .get(nextLink === "/" ? `${HOST}/api?page=1` : nextLink, {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        SetPosts((prevPosts) => [...prevPosts, ...response?.data?.data]);
        SetLinks(response?.data?.links);

        if (response?.data?.data?.length === 0) {
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

    if (paginateNow) {
      getData(links.next);
      SetPaginateNow(false);
    }
  }, [paginateNow]);

  return (
    <App>
      <div className="flex flex-col gap-5 mt-14">
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
    </App>
  );
}
