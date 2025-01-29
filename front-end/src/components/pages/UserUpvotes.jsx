import { useEffect, useState } from "react";
import App from "../../App";

import axios from "axios";

import Post from "../Post";
import Comment from "../Comment";
//svgs
import { ReactComponent as UserSvg } from "../../assets/svg/user.svg";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { SimpleButton } from "../buttons";

import { useBlueditDataContext } from "../../api/DataContext";

export default function User() {
  const { paginateNow, SetPaginateNow } = useBlueditDataContext();

  const [isFirstRender, SetIsFirstRender] = useState(true);
  const [postsAndComments, SetPostsAndComments] = useState([]);
  const [user, SetUser] = useState([]);
  const [links, SetLinks] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();

  const HOST = process.env.REACT_APP_API_HOST;

  const getData = (nextLink = null) => {
    if (!nextLink) return;

    axios
      .get(
        nextLink === "/"
          ? `${HOST}/api/users/${username}/upvotes?page=1`
          : nextLink
      )
      .then((requestData) => {
        console.log(requestData);
        if (requestData?.data?.data?.user) SetUser(requestData.data.data.user);

        if (requestData?.data?.data?.upvoted?.entity) {
          SetPostsAndComments((prevPosts) => [
            ...prevPosts,
            ...requestData.data.data.upvoted.entity,
          ]);
        }
        if (requestData?.data?.data?.links)
          SetLinks(requestData.data.data.links);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (isFirstRender) {
      getData("/");
      SetIsFirstRender(false);
    }

    if (paginateNow && links.next) {
      getData(links?.next);
      SetPaginateNow(false);
    }
  }, [paginateNow]);

  return (
    <App>
      <section className="w-full flex flex-col  items-center">
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
              <SimpleButton
                link={`/users/${username}`}
                active={
                  location.pathname === `/users/${username}` ? true : false
                }
                slot={"Posts"}
              />
              <SimpleButton
                link={`/users/${username}/comments`}
                active={
                  location.pathname === `/users/${username}/comments`
                    ? true
                    : false
                }
                slot={"Comments"}
              />
              <SimpleButton
                link={`/users/${username}/upvotes`}
                active={
                  location.pathname === `/users/${username}/upvotes`
                    ? true
                    : false
                }
                slot={"Upvoted"}
              />
            </ul>
          </div>
        </div>
        <div className="w-[60%] flex flex-col gap-5 mt-14 items-center">
          {postsAndComments
            ? postsAndComments.map((entity, index) => {
                if (entity.type === "post") {
                  const postTitle = entity.content.replaceAll(" ", "_");
                  return (
                    <Post
                      key={index}
                      post={entity}
                      displayUsername={false}
                      onClick={() =>
                        navigate(`/posts/${entity.id}/${postTitle}`)
                      }
                    />
                  );
                } else {
                  return <Comment key={index} comment={entity} />;
                }
              })
            : null}
        </div>
      </section>
    </App>
  );
}
