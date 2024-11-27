import { LinkButton, UpvoteButton, DownvoteButton } from "./buttons";
import { ReactComponent as CommentSvg } from "../assets/svg/comment.svg";

export default function Post({ post }) {
  return (
    <div className="w-[750px] h-[650px] flex flex-col hover:cursor-pointer hover:bg-[#192028] hover:rounded-xl px-3 border-b-[1px] border-[#192028] shadow-md">
      <div className="flex flex-row w-[40%] items-center gap-1">
        <div>
          <LinkButton slot={post.community_name} />
        </div>
        <span className="w-1 h-1 rounded-full bg-white"></span>
        <div>
          <p className="text-white text-[10px]">{post.created_at}</p>
        </div>
      </div>
      <div className="w-full px-2">
        <h1 className="text-2xl text-white">{post.title}</h1>
      </div>
      <div className="w-full h-[80%] bg-blue-300 my-2 rounded-lg"></div>
      <div className="w-full h-[5%] flex items-center gap-5">
        <div className="flex items-center gap-3 px-3 py-1 bg-[#192028] rounded-full shadow-lg">
          <UpvoteButton />
          <p className="text-white">
            {console.log(post.upvote_count, post.downvote_count)}
            {post.upvote_count - post.downvote_count}
          </p>
          <DownvoteButton />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[#192028] rounded-full shadow-2xl shadow-black">
          <CommentSvg />
          <p className="text-white">10</p>
        </div>
      </div>
    </div>
  );
}
