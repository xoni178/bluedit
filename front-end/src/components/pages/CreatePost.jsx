import { SimpleButton } from "../buttons";
export default function CreatePost() {
  return (
    <section className="w-[50%] h-fit flex flex-col gap-3">
      <div className="flex">
        <h1 className="text-white text-3xl font-bold">Create Post</h1>
      </div>
      <div className="w-[50%]">
        <input
          type="text"
          name=""
          id=""
          placeholder="Select a community"
          className="w-full h-[40px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white"
        />
      </div>
      <div className="w-[40%] flex gap-4 text-white">
        <SimpleButton />
        <SimpleButton />
        <SimpleButton />
        {/* <x-buttons.simple>Text</x-buttons.simple>
            <x-buttons.simple>Image</x-buttons.simple>
            <x-buttons.simple>Video</x-buttons.simple> */}
      </div>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full h-[40px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white"
        />
      </div>
      <div>
        <textarea
          placeholder="Body"
          name="body"
          cols="30"
          rows="10"
          className="w-full px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-lg text-white"
        ></textarea>
      </div>
    </section>
  );
}
