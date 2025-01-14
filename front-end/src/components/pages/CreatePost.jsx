import App from "../../App";
import { SimpleButton } from "../buttons";

import ApiRequest from "../../api/ApiRequest";
import { useEffect, useState } from "react";

import SearchBar from "../Searchbar";
import CommunitySelector from "../CommunitySelector";

export default function CreatePost() {
  const [show, SetShow] = useState(false);
  const [title, SetTittle] = useState(null);
  const [body, SetBody] = useState(null);
  const [selectedCommunity, SetSelectedCommunity] = useState();

  const onSubmit = (e) => {
    e.preventDefault();

    const authUser = JSON.parse(localStorage.getItem("authUser"));

    ApiRequest.post(
      "/api/create",
      {
        title,
        body,
      },
      {
        headers: {
          Authorization: `Bearer ${authUser ? authUser.token : null}`,
        },
      }
    );
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
          <SimpleButton slot={"Text"} />
          <SimpleButton slot={"Image"} />
          <SimpleButton slot={"Video"} />
        </div>
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
        <button type="submit"></button>
        <button type="submit">Submit</button>
      </section>
    </App>
  );
}
