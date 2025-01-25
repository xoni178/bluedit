import { useEffect, useState } from "react";
import App from "../../App";

import { useBlueditDataContext } from "../../api/DataContext";
import ApiRequest from "../../api/ApiRequest";

import { ListButton } from "../buttons";
import CommunitySelector from "../CommunitySelector";

export default function CreatePost() {
  const { SetException } = useBlueditDataContext();

  const [selectedCommunity, SetSelectedCommunity] = useState();
  const [title, SetTittle] = useState(null);

  const [postType, SetPostType] = useState(null);

  const [imageFile, SetImageFile] = useState(null);
  const [videoFile, SetVideoFile] = useState(null);
  const [body, SetBody] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    ApiRequest.get("/sanctum/csrf-cookie").then(() => {
      ApiRequest.post("/api/create", {
        title,
        body,
      }).catch((error) => {
        SetException(error.response?.data?.message);
      });
    });
  };

  return (
    <App>
      <section className="w-[50%] h-fit flex flex-col gap-3">
        <div className="flex">
          <h1 className="text-white text-3xl font-bold">Create Post</h1>
        </div>
        <div className="w-[50%]">
          <CommunitySelector
            selectedCommunity={selectedCommunity}
            setSelectedCommunity={(selectedCommunity) =>
              SetSelectedCommunity(selectedCommunity)
            }
          />
        </div>
        <div className="w-[40%] flex gap-4 text-white">
          <ListButton
            slot={"Text"}
            onClick={() => SetPostType("text_post")}
            active={postType === "text_post" ? true : false}
          />
          <ListButton
            slot={"Image"}
            onClick={() => SetPostType("image_post")}
            active={postType === "image_post" ? true : false}
          />
          <ListButton
            slot={"Video"}
            onClick={() => SetPostType("video_post")}
            active={postType === "video_post" ? true : false}
          />
        </div>

        <form
          method="post"
          onSubmit={(e) => onSubmit(e)}
          className="flex flex-col gap-5 justify-"
        >
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full h-[40px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white"
              onChange={(e) => SetTittle(e.target.value)}
            />
          </div>
          <div>
            <textarea
              placeholder="Body"
              name="body"
              cols="30"
              rows="10"
              className="w-full px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-lg text-white"
              onChange={(e) => SetBody(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="text-white hover:cursor-pointer hover:bg-[#192028] px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </App>
  );
}
