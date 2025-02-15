import { useEffect, useState } from "react";

import Comment from "../Comment";

//svgs
import { ReactComponent as UserSvg } from "../../assets/svg/user.svg";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { SimpleButton } from "../buttons";
import axios from "axios";

import Loading from "../helpers/Loading";

import { useBlueditDataContext } from "../../api/DataContext";

import UserInfo from "../UserInfo";

export default function UserComments() {
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
    setShowMessage(false);

    if (!nextLink) return;

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

        if (response?.data?.data?.comments.length === 0) {
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
      getData(links.next);
      SetPaginateNow(false);
    }

    if (comments.length !== 0 && !links.next) {
      setShowMessage(true);
    }
  }, [paginateNow]);

  return (
    <section className="w-full flex flex-col  items-center">
      <div className="w-full flex items-center flex-col">
        <UserInfo user={user} />
        <div>
          <ul className="text-white flex flex-row gap-10">
            <SimpleButton
              link={`/users/${username}`}
              active={location.pathname === `/users/${username}` ? true : false}
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
              <h1 className="text-white text-xl">No more comments to show</h1>
            </div>
          ) : (
            <Loading />
          )
        ) : null}
      </div>
    </section>
  );
}
