import { useEffect, useState } from "react";
import ApiRequest from "../../api/ApiRequest";

import { ReactComponent as LeftArrowSvg } from "../../assets/svg/left-arrow.svg";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";

import Post from "../Post";
import Comment from "../Comment";

import Loading from "../helpers/Loading";

import { useBlueditDataContext } from "../../api/DataContext";

export default function PostPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { SetException, SetSuccess, SetPaginateNow, paginateNow } =
    useBlueditDataContext();
  const [showMessage, setShowMessage] = useState(false);

  const [post, SetPost] = useState(null);
  const [comments, SetComments] = useState([]);
  const [links, SetLinks] = useState(null);

  const [commentValue, SetCommentValue] = useState("");
  const [createdComments, SetCreatedComments] = useState([]);
  const [isFirstRender, SetIsFirstRender] = useState(true);

  const HOST = process.env.REACT_APP_API_HOST;

  const getData = (nextLink = null) => {
    if (!nextLink) return;
    const postId = location.pathname.split("/")[2];
    setShowMessage(false);

    axios
      .get(
        nextLink === "/" ? `${HOST}/api/posts/${postId}/?page=1` : nextLink,
        {
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        SetPost(response?.data?.post);
        SetComments((prev) => [...prev, ...response?.data?.comments]);
        SetLinks(response?.data?.links);

        if (comments.length === 0) {
          setShowMessage(true);
        }
      })
      .catch((err) => {
        SetException(err?.message);
      });
  };

  useEffect(() => {
    if (isFirstRender) {
      getData("/");
      SetIsFirstRender(false);
    }
    console.log(paginateNow, links);
    if (paginateNow) {
      getData(links.next);
      SetPaginateNow(false);
    }
  }, [paginateNow]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postId = location.pathname.split("/")[2];

    ApiRequest.post(`api/posts/${postId}/comment`, {
      body: commentValue,
    })
      .then((response) => {
        console.log(response);
        SetSuccess(response?.data?.message);
        SetCreatedComments((prev) => [...prev, response?.data?.comment]);
        SetCommentValue("");
      })
      .catch((err) => {
        console.log(err);
        if (err.status < 500) {
          SetException(err?.response?.data?.message);
        }

        if (err.status === 401 || err.status === 403) {
          SetException("Please Login first!");
          navigate("/login", { replace: true });
        }
      });
  };

  return (
    <section className="flex flex-col gap-5">
      {post ? (
        <div className="flex flex-row gap-1">
          <div
            onClick={() => {
              const prevPath = window.history.back() || "/";
              navigate(prevPath, { replace: true });
            }}
            className="w-[32px] h-[32px] flex flex-row justify-center items-center mt-[5px] rounded-full bg-[#192028] hover:cursor-pointer"
          >
            <span>
              <LeftArrowSvg />
            </span>
          </div>

          <Post post={post} displayUsername={true} />
        </div>
      ) : (
        <Loading />
      )}

      {post ? (
        <div className="w-full h-fit flex flex-col gap-3 justify-start mt-10">
          <div>
            <form method="post" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="Write a comment..."
                className="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none"
                onChange={(e) => SetCommentValue(e.target.value)}
                value={commentValue}
              />
            </form>
          </div>

          {createdComments.length !== 0
            ? createdComments.map((comment, index) => {
                return <Comment key={index} comment={comment} />;
              })
            : null}
          {comments.length === 0 && createdComments.length === 0 ? (
            showMessage ? (
              <div className="flex justify-center items-center h-[50vh]">
                <h1 className="text-white text-3xl">No comments</h1>
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
      ) : (
        <Loading />
      )}
    </section>
  );
}
