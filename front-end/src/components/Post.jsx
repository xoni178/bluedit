import { useEffect, useState } from "react";
import { LinkButton, UpvoteButton, DownvoteButton } from "./buttons";
import { ReactComponent as CommentSvg } from "../assets/svg/comment.svg";

import ApiRequest from "../api/ApiRequest";

export default function Post({ post, onClick, displayUsername }) {
  const [upvoted, SetUpvoted] = useState(false);
  const [downvoted, SetDownvoted] = useState(false);

  const HOST = process.env.REACT_APP_API_HOST;

  const handleUpvote = (e) => {
    e.stopPropagation();

    ApiRequest.post(`/api/posts/upvote`, {
      post_id: post.post_id,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("upvoted");
          SetUpvoted((prev) => !prev);
          if (downvoted) SetDownvoted(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDownvote = (e) => {
    e.stopPropagation();

    ApiRequest.post(`/api/posts/downvote`, {
      post_id: post.post_id,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("downvoted");
          if (upvoted) SetUpvoted(false);
          SetDownvoted((prev) => !prev);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (post && post?.vote === "UPVOTE") {
      if (!upvoted) SetUpvoted(true);
      if (downvoted) SetDownvoted(false);
    } else if (post && post?.vote === "DOWNVOTE") {
      if (upvoted) SetUpvoted(false);
      if (!downvoted) SetDownvoted(true);
    }
  }, []);

  return (
    <div
      onClick={!displayUsername ? onClick : null}
      className={
        "w-[750px] h-fit flex flex-col px-3 border-b-[1px] border-[#192028] shadow-md" +
        (!displayUsername
          ? " hover:cursor-pointer hover:bg-[#192028] hover:rounded-xl"
          : null)
      }
    >
      <div className="flex flex-row w-full items-center gap-3">
        <div className="w-fit flex flex-row flex-start items-center">
          <LinkButton
            type={"community"}
            community={post?.community}
            slot={post.type ? post.belongsTo : post.community_name}
          />
          {displayUsername ? (
            <a
              href={`/users/${post.username}`}
              className="text-white text-[10px] hover:underline"
            >
              u/{post.username}
            </a>
          ) : null}
        </div>
        <div className="ml-5">
          <p className="text-white text-[10px]">{post.created_at}</p>
        </div>
      </div>
      <div className="w-full px-2">
        <h1 className="text-2xl text-white">{post.title}</h1>
      </div>
      {post.postable_type === "text_post" ? (
        <div className="w-full h-[100px] my-2 rounded-lg">
          <p className="text-white">
            {post.content_resource.slice(0, 300) + "..."}
          </p>
        </div>
      ) : null}
      {post.postable_type === "image_post" ? (
        <div className="w-full h-[500px] my-2 rounded-lg">
          <img
            src={HOST + post.content_resource}
            alt={post.title}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      ) : null}
      {post.postable_type === "video_post" ? (
        <div className="w-full h-[450px] my-2 rounded-lg flex ">
          <video className="w-full h-full" controls>
            <source
              src={HOST + post.content_resource}
              type="video/mp4"
            ></source>
          </video>
        </div>
      ) : null}

      <div
        className="w-full h-[30px] flex items-center gap-5 mb-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-2 py-1 bg-[#192028] rounded-full shadow-lg">
          <div
            onClick={(e) => handleUpvote(e)}
            className="w-5 h-full flex justify-center items-center"
          >
            <UpvoteButton upvoted={upvoted} />
          </div>

          <p className="text-white w-2 ">
            {post
              ? post.upvote_count -
                post.downvote_count +
                ((upvoted ? 1 : 0) || (downvoted ? -1 : 0))
              : null}
          </p>
          <div
            onClick={(e) => handleDownvote(e)}
            className=" w-5 h-full flex justify-center items-center"
          >
            <DownvoteButton downvoted={downvoted} />
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[#192028] rounded-full shadow-2xl shadow-black">
          <CommentSvg />
          <p className="text-white">{post.comment_count}</p>
        </div>
      </div>
    </div>
  );
}
