import { ReactComponent as UpvoteSvg } from "../../assets/svg/upvote.svg";
import { ReactComponent as UpvotedSvg } from "../../assets/svg/upvoted.svg";

export default function UpvoteButton({ onClick, upvoted }) {
  return (
    <button onClick={onClick} className="z-[10]">
      {upvoted ? <UpvotedSvg /> : <UpvoteSvg />}
    </button>
  );
}
