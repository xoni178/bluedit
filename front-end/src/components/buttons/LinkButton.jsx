//svgs
import { ReactComponent as PopularSvg } from "../../assets/svg/popular.svg";
import { ReactComponent as HouseSvg } from "../../assets/svg/house.svg";

export default function LinkButton({ type, isHome, slot }) {
  return (
    <a
      href="/r/{{ $link }}"
      className="w-full h-[40px] bg-transparent hover:bg-[#192028] flex flex-row justify-start items-center gap-3 p-2 rounded"
    >
      {type === "link" ??
        (isHome ? (
          <div>
            <HouseSvg />
          </div>
        ) : (
          <div>
            <PopularSvg />
          </div>
        ))}

      <div className="flex flex-row items-center gap-2">
        <div className="bg-[#192028] w-[32px] h-[32px] rounded-full"></div>
        <p className="text-white text-[15px] hover:underline">
          {type === "community" ? "r/" : null}
          {slot}
        </p>
      </div>
    </a>
  );
}
