export default function SimpleButton({ link, slot, active }) {
  return (
    <a
      className={`
            w-fit
            px-4
            py-2
            rounded-full
            hover:bg-[#192028]
            hover:cursor-pointer
            ${active ? "bg-[#192028]" : ""}`}
      href={link}
    >
      <p className="text-white">{slot}</p>
    </a>
  );
}
