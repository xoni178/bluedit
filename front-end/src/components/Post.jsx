import { LinkButton, UpvoteButton, DownvoteButton } from "./buttons";
import { ReactComponent as CommentSvg } from "../assets/svg/comment.svg";

export default function Post({ post, onClick, displayUsername }) {
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
            src={"http://127.0.0.1:8000" + post.content_resource}
            alt={post.title}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      ) : null}
      {post.postable_type === "video_post" ? (
        <div className="w-full h-[450px] my-2 rounded-lg flex ">
          <video className="w-full h-full" controls>
            <source
              src={"http://127.0.0.1:8000" + post.content_resource}
              type="video/mp4"
            ></source>
          </video>
        </div>
      ) : null}

      <div className="w-full h-[30px] flex items-center gap-5 mb-1">
        <div className="flex items-center gap-3 px-3 py-1 bg-[#192028] rounded-full shadow-lg">
          <UpvoteButton />
          <p className="text-white">
            {post ? post.upvote_count - post.downvote_count : null}
          </p>
          <DownvoteButton />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[#192028] rounded-full shadow-2xl shadow-black">
          <CommentSvg />
          <p className="text-white">{post.comment_count}</p>
        </div>
      </div>
    </div>
  );
}
