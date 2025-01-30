export default function CreateButton({ community }) {
  return (
    <a
      href={"/create" + (community ? `?community=${community}` : "")}
      className="w-[125px] h-[40px] bg-transparent flex justify-center items-center gap-3 hover:bg-[#192028] hover:cursor-pointer rounded-2xl"
    >
      <span>
        <svg
          fill="white"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path>
        </svg>
      </span>
      <p className="text-white">Create Post</p>
    </a>
  );
}
