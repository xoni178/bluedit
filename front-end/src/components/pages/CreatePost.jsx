import { useRef, useState } from "react";
import App from "../../App";

import { useNavigate, useSearchParams } from "react-router";

import { useBlueditDataContext } from "../../api/DataContext";
import { ResizeImage } from "../helpers/ResizeImage";
import ApiRequest from "../../api/ApiRequest";

import { ListButton } from "../buttons";
import CommunitySelector from "../CommunitySelector";
import UploadIcon from "../../assets/img/upload.png";

export default function CreatePost() {
  const { SetException, SetSuccess } = useBlueditDataContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const community = searchParams.get("community");

  const imageRef = useRef();

  const [selectedCommunity, SetSelectedCommunity] = useState(
    community ? community : null
  );
  const [title, SetTittle] = useState(null);

  const [postType, SetPostType] = useState("text_post");

  const [imageFile, SetImageFile] = useState(null);
  const [videoFile, SetVideoFile] = useState(null);
  const [videoFileRaw, SetVideoFileRaw] = useState(null);
  const [body, SetBody] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    switch (postType) {
      case "text_post":
        formData.append("title", title);
        formData.append("community_name", selectedCommunity.name);
        formData.append("body", body);
        formData.append("postable_type", postType);
        break;
      case "image_post":
        console.log(imageFile);
        formData.append("title", title);
        formData.append("community_name", selectedCommunity?.name);
        formData.append("image", imageFile);
        formData.append("postable_type", postType);
        break;
      case "video_post":
        formData.append("title", title);
        formData.append("community_name", selectedCommunity?.name);
        formData.append("video", videoFileRaw);
        formData.append("postable_type", postType);
        break;
      default:
        SetException("Invalid post type");
        break;
    }

    ApiRequest.get("/sanctum/csrf-cookie").then(() => {
      ApiRequest.post("/api/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", //required!!
        },
      })
        .then((response) => {
          if (response.status === 201) {
            SetSuccess("Post created successfully!");
            navigate("/posts/" + response?.data?.post_id);
          }

          console.log(response);
        })
        .catch((error) => {
          SetException(error.response?.data?.message);
        });
    });
  };

  const handleImageReader = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        SetException("Only images are allowed!");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        SetException("File too large! Under 2MB is allowed.");
        return;
      }

      SetImageFile(file);

      ResizeImage(file, 500, 500, (resizedBlob) => {
        const resizedUrl = URL.createObjectURL(resizedBlob);
        imageRef.current.src = resizedUrl;
        imageRef.current.style.display = "block";
      });
    }
  };

  const handleVideoPreview = (e) => {
    const file = e.target.files[0];

    if (file) {
      SetVideoFileRaw(file);
      const videoURL = URL.createObjectURL(file);

      SetVideoFile(videoURL);
    }
  };

  return (
    <App>
      <section className="w-[600px] h-fit max-sm:w-[400px] flex flex-col gap-3 mt-5">
        <div className="flex">
          <h1 className="text-white text-3xl font-bold max-sm:text-lg">
            Create Post
          </h1>
        </div>
        <div className="w-[60%]">
          <CommunitySelector
            setSelectedCommunity={(selectedCommunity) =>
              SetSelectedCommunity(selectedCommunity)
            }
            selectedCommunity={selectedCommunity}
          />
        </div>
        <div className="w-[300px] flex gap-4 text-white">
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
          className="flex flex-col gap-5 "
        >
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full h-[40px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white"
              onChange={(e) => SetTittle(e.target.value)}
              required
            />
          </div>
          {postType === "video_post" ? (
            videoFile ? (
              <div className="w-[720px] h-[480px] relative rounded-lg ">
                <video controls src={videoFile} className="w-full h-full" />
                <span
                  className="absolute w-6 h-6 bg-red-500 cursor-pointer rounded-full top-2 right-2"
                  onClick={() => SetVideoFile(null)}
                ></span>
              </div>
            ) : (
              <div>
                <div className="relative flex justify-center items-center ">
                  <input
                    type="file"
                    name="video"
                    id="video"
                    accept="video/*"
                    onChange={(e) => {
                      handleVideoPreview(e);
                    }}
                    className="opacity-0 w-[500px] h-[160px] absolute top-0 left-0 right-0 bottom-0 mx-auto cursor-pointer bg-red-400 rounded-lg"
                    required
                  />
                  <button className="flex justify-center items-center gap-5 w-[500px] h-[160px] cursor-pointer bg-[#192028] text-white rounded-lg">
                    <span className="w-24 h-24 rounded-full bg-gray-500 flex justify-center items-center">
                      <div className="w-11 h-11">
                        <img src={UploadIcon} alt="" />
                      </div>
                    </span>
                    <p className="text-sm">Upload Video</p>
                  </button>
                </div>
              </div>
            )
          ) : null}
          {postType === "image_post" ? (
            imageFile ? (
              <div className="w-[720px] h-[480px] relative rounded-lg ">
                <img
                  className="w-full h-full object-contain"
                  ref={imageRef}
                  src=""
                  alt="preview"
                />
                <span
                  className="absolute w-6 h-6 bg-red-500 cursor-pointer rounded-full top-2 right-2"
                  onClick={() => SetImageFile(null)}
                ></span>
              </div>
            ) : (
              <div>
                <div className="relative flex justify-center items-center ">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handleImageReader(e)}
                    className="opacity-0 w-[500px] h-[160px] absolute top-0 left-0 right-0 bottom-0 mx-auto cursor-pointer bg-red-400 rounded-lg"
                    required
                  />
                  <button className="flex justify-center items-center gap-5 w-[500px] h-[160px] cursor-pointer bg-[#192028] text-white rounded-lg">
                    <span className="w-24 h-24 rounded-full bg-gray-500 flex justify-center items-center">
                      <div className="w-11 h-11">
                        <img src={UploadIcon} alt="" />
                      </div>
                    </span>
                    <p className="text-sm">Upload Image</p>
                  </button>
                </div>
              </div>
            )
          ) : null}
          {postType === "text_post" ? (
            <div>
              <textarea
                placeholder="Body"
                name="body"
                cols="30"
                rows="10"
                className="w-full px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-lg text-white"
                onChange={(e) => SetBody(e.target.value)}
                required
              ></textarea>
            </div>
          ) : null}

          <div>
            <button
              type="submit"
              className="w-[80px] h-[40px] bg-[#3278cd] flex justify-center items-center text-white rounded-full border border-[#192028] hover:bg-[#020c18] hover:cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </App>
  );
}
