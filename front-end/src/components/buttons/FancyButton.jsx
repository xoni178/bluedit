export default function FancyButton({ link, slot }) {
  return (
    <a
      href={link}
      className="w-[80px] h-[40px] bg-[#3278cd] flex justify-center items-center rounded-full border border-[#192028] hover:bg-[#020c18] hover:cursor-pointer"
    >
      <p className="text-white">{slot}</p>
    </a>
  );
}
