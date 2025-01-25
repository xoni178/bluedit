import { useEffect, useState } from "react";

import axios from "axios";

import Post from "../Post";
import App from "../../App";

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

  const getData = (nextLink = null) => {
    if (!nextLink) return;

    axios
      .get(nextLink === "/" ? "http://127.0.0.1:8000/api?page=1" : nextLink)
      .then((posts) => {
        console.log(posts?.data?.data);
        SetPosts((prevPosts) => [...prevPosts, ...posts?.data?.data]);
        SetLinks(posts?.data?.links);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <App>
      <div className="flex flex-col gap-5  mt-14">
        {}
        {posts.length === 0 ? (
          showMessage ? (
            <div className="flex justify-center items-center h-[50vh]">
              <h1 className="text-white text-3xl">No posts to show</h1>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[50vh]">
              <h1 className="text-white text-3xl">Loading...</h1>
            </div>
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
    </App>
  );
}
