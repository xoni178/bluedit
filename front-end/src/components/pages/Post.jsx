import { UpvoteButton, DownvoteButton, LinkButton } from "../buttons";

import CommentSvg from "../../assets/svg/comment.svg";
import LeftArrowSvg from "../../assets/svg/left-arrow.svg";
import App from "../../App";

export default function Post() {
  return (
    <App>
      <section>
        <div className="w-[128px] h-[128px] rounded-full bg-[#192028] hover:cursor-pointer">
          <span>
            <LeftArrowSvg />
          </span>
        </div>

        <div className="w-[750px] h-[650px] flex flex-col hover:cursor-pointer hover:bg-[#192028] hover:rounded-xl px-3 border-b-[1px] border-[#192028] shadow-md">
          <div className="flex flex-row w-[40%] items-center gap-1">
            <div>
              {/* <x-buttons.link :type="'community'">{{ $post->community_name }}</x-buttons.link> */}
              <LinkButton />
            </div>
            <span className="w-1 h-1 rounded-full bg-white"></span>
            <div>
              {/* <p className="text-white text-[10px]">{{ $post->created_at }}</p> */}
            </div>
          </div>
          <div className="w-full px-2">
            {/* <h1 className="text-2xl text-white">{{ $post->title }}</h1> */}
          </div>
          <div className="w-full h-[80%] bg-blue-300 my-2 rounded-lg"></div>
          <div className="w-full h-[5%] flex items-center gap-5">
            <div className="flex items-center gap-3 px-3 py-1 bg-[#192028] rounded-full shadow-lg">
              <UpvoteButton />
              <DownvoteButton />
              {/* <x-buttons.upvote />
                    <p className="text-white">{{ $post->upvote_count - $post->downvote_count }}</p>
                    <x-buttons.downvote /> */}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#192028] rounded-full shadow-2xl shadow-black">
              <CommentSvg />
              <p className="text-white">10</p>
            </div>
          </div>
        </div>
      </section>
    </App>
  );
}
