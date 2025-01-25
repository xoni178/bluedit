export default function ListButton({ slot, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
              w-fit
              px-4
              py-2
              rounded-full
              hover:bg-[#192028]
              hover:cursor-pointer
              ${active ? "bg-[#192028]" : ""}`}
    >
      <p className="text-white">{slot}</p>
    </button>
  );
}
