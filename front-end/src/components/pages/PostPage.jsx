import { useEffect, useState } from "react";
import ApiRequest from "../../api/ApiRequest";

import { ReactComponent as LeftArrowSvg } from "../../assets/svg/left-arrow.svg";
import App from "../../App";

import { useLocation, useNavigate } from "react-router-dom";

import Post from "../Post";
import Comment from "../Comment";

import Loading from "../helpers/Loading";

export default function PostPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [post, SetPost] = useState(null);

  useEffect(() => {
    const postId = location.pathname.split("/")[2];

    ApiRequest.get(`api/posts/${postId}`)
      .then((response) => {
        console.log(response);
        SetPost(response?.data?.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <App>
      <section className="flex flex-col">
        {post ? (
          <div>
            <div
              onClick={() => {
                const prevPath = location.state?.previousPath || "/";
                navigate(prevPath, { replace: true });
              }}
              className="w-[32px] h-[32px] flex flex-row justify-center items-center mt-[5px] rounded-full bg-[#192028] hover:cursor-pointer"
            >
              <span>
                <LeftArrowSvg />
              </span>
            </div>

            <Post post={post.post} displayUsername={true} />
          </div>
        ) : (
          <Loading />
        )}

        <div className="w-full h-fit flex flex-col gap-3 justify-start mt-10">
          {post ? (
            post.comments.map((comment, index) => {
              return <Comment key={index} comment={comment} />;
            })
          ) : (
            <Loading />
          )}
        </div>
      </section>
    </App>
  );
}
