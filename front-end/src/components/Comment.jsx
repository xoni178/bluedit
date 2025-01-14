import { UpvoteButton, DownvoteButton } from "./buttons";

import { ReactComponent as CommentSvg } from "../assets/svg/comment.svg";
import { ReactComponent as UserSvg } from "../assets/svg/user.svg";

export default function Comment({ comment }) {
  return (
    <div className="w-full h-fit flex flex-col my-5">
      <div className="w-full flex justify-start items-center gap-5 text-white">
        <div className="w-full flex items-center gap-2">
          <div className="w-8 h-8">
            <UserSvg />
          </div>
          <p>{comment.username}</p>
        </div>

        <p className="text-sm">{comment.created_at}</p>
      </div>
      <div className="w-full h-fit px-2 py-4">
        <p className="text-white">
          {comment.type ? comment.content : comment.body}
        </p>
      </div>
      <div className="w-full h-[5%] flex items-center gap-5 mt-2">
        <div className="flex items-center gap-3 px-3 py-1 bg-[#192028] rounded-full shadow-lg">
          <UpvoteButton />
          <p className="text-white">
            {comment
              ? comment.upvote_count && comment.downvote_count
                ? comment.upvote_count - comment.downvote_count
                : 0
              : null}
          </p>
          <DownvoteButton />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[#192028] rounded-full shadow-2xl shadow-black">
          <CommentSvg />
          <p className="text-white">Reply</p>
        </div>
      </div>
    </div>
  );
}
