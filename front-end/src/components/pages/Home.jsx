import { useEffect, useState } from "react";

import axios from "axios";

import Post from "../Post";
import App from "../../App";

//context
import { useBlueditDataContext } from "../../api/DataContext";

import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const [isFirstRender, SetIsFirstRender] = useState(true);
  const [posts, SetPosts] = useState([]);
  const [links, SetLinks] = useState({});
  const { paginateNow, SetPaginateNow } = useBlueditDataContext();

  const getData = (nextLink = null) => {
    if (!nextLink) return;

    axios
      .get(nextLink === "/" ? "http://127.0.0.1:8000/api?page=1" : nextLink)
      .then((posts) => {
        console.log("made request" + nextLink);
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

  return (
    <App>
      <div className="flex flex-col gap-5  mt-14">
        {posts.map((post, index) => {
          const postTitle = post.title.replaceAll(" ", "_");

          return (
            <Post
              key={index}
              post={post}
              displayUsername={false}
              onClick={() => navigate(`posts/${post.post_id}/${postTitle}`)}
            />
          );
        })}
      </div>
    </App>
  );
}
