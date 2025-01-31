import { useEffect, useState } from "react";
import App from "../../App";

import Comment from "../Comment";

//svgs
import { ReactComponent as UserSvg } from "../../assets/svg/user.svg";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { SimpleButton } from "../buttons";
import axios from "axios";

import Loading from "../helpers/Loading";

import { useBlueditDataContext } from "../../api/DataContext";

import UseWindowDimensions from "../helpers/UseWindowDimensions";

export default function UserComments() {
  const { width } = UseWindowDimensions();

  const { paginateNow, SetPaginateNow } = useBlueditDataContext();
  const [isFirstRender, SetIsFirstRender] = useState(true);
  const [comments, SetComments] = useState([]);
  const [user, SetUser] = useState([]);
  const [links, SetLinks] = useState({});

  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();

  const HOST = process.env.REACT_APP_API_HOST;

  const getData = (nextLink = null) => {
    if (!nextLink) return;
    setShowMessage(false);
    axios
      .get(
        nextLink === "/"
          ? `${HOST}/api/users/${username}/comments?page=1`
          : nextLink
      )
      .then((response) => {
        SetUser(response?.data?.data?.user);

        SetComments((prevPosts) => [
          ...prevPosts,
          ...response?.data?.data?.comments,
        ]);

        SetLinks(response?.data?.data?.links);

        if (comments.length === 0) {
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

    if (paginateNow && links.next) {
      getData(links?.next);
      SetPaginateNow(false);
    }
  }, [paginateNow]);

  if (links.next) {
    console.log("nooo");
  }

  return (
    <App>
      <section className="w-full flex flex-col  items-center">
        <div className="w-full flex items-center flex-col">
          {width >= 640 ? (
            <div className="w-[700px] h-[200px] flex flex-row justify-center items-center gap-5">
              <div className="flex flex-row justify-center items-center gap-5">
                <div className="w-[64px] h-[64px]">
                  <UserSvg />
                </div>
                <h1 className="text-white text-3xl">{user.username}</h1>
              </div>
              <div className="w-[350px] h-[100px] bg-black flex flex-row items-center p-5 rounded-lg">
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
          ) : (
            <div className="w-[700px] h-[400px] flex flex-col justify-center items-center gap-5">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="w-[64px] h-[64px]">
                  <UserSvg />
                </div>
                <h1 className="text-white text-3xl">{user.username}</h1>
              </div>
              <div className="w-[350px] h-[100px] bg-black flex flex-row items-center p-5 rounded-lg">
                <div className="w-full text-white flex flex-col items-center">
                  <p className="text-lg">{user.posts_karma}</p>
                  <p className="text-sm text-gray-400">Post karma</p>
                </div>
                <div className="w-full text-white flex flex-col items-center text-center">
                  <p className="text-lg">{user.comments_karma}</p>
                  <p className="text-sm text-gray-400">Comment karma</p>
                </div>
                <div className="w-full text-white flex flex-col items-center">
                  <p className="text-lg ">{user.created_at}</p>
                  <p className="text-sm text-gray-400">Cake day</p>
                </div>
              </div>
            </div>
          )}

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
        <div className="w-[60%] h-fit flex flex-col gap-5 mt-14 items-center">
          {comments.length === 0 ? (
            showMessage ? (
              <div className="flex justify-center items-center h-[50vh]">
                <h1 className="text-white text-3xl max-sm:text-lg">
                  No comments to show
                </h1>
              </div>
            ) : (
              <Loading />
            )
          ) : (
            comments.map((comment, index) => {
              return <Comment key={index} comment={comment} />;
            })
          )}
          {comments.length !== 0 ? (
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
    </App>
  );
}
