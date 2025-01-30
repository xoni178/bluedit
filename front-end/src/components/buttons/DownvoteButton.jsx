import { ReactComponent as DownvoteSvg } from "../../assets/svg/downvote.svg";
import { ReactComponent as DownvotedSvg } from "../../assets/svg/downvoted.svg";

export default function DownvoteButton({ onClick, downvoted }) {
  return (
    <button onClick={onClick}>
      {downvoted ? <DownvotedSvg /> : <DownvoteSvg />}
    </button>
  );
}
