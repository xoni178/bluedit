import { LinkButton, UpvoteButton, DownvoteButton } from "./buttons";
import { ReactComponent as CommentSvg } from "../assets/svg/comment.svg";

export default function Post({ post, onClick, displayUsername }) {
  return (
    <div
      onClick={!displayUsername ? onClick : null}
      className={
        "w-[750px] h-[650px] flex flex-col px-3 border-b-[1px] border-[#192028] shadow-md" +
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
        <h1 className="text-2xl text-white">
          {post.type ? post.content : post.title}
        </h1>
      </div>
      <div className="w-full h-[80%] bg-blue-300 my-2 rounded-lg"></div>
      <div className="w-full h-[5%] flex items-center gap-5">
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
