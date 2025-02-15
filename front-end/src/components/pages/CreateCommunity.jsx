import { useState, useRef } from "react";

import { useNavigate } from "react-router";
import { useBlueditDataContext } from "../../api/DataContext";

import UploadIcon from "../../assets/img/upload.png";

import ImageReader from "../helpers/ImageReader";
import ApiRequest from "../../api/ApiRequest";
const CreateCommunity = () => {
  const { SetException, SetSuccess } = useBlueditDataContext();

  const navigate = useNavigate();

  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [iconImage, SetIconImage] = useState(null);
  const [bannerImage, SetBannerImage] = useState(null);

  const [error, SetError] = useState(null);

  const iconImageRef = useRef();
  const bannerImageRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", name);
    formData.append("desc", description);

    if (iconImage) formData.append("icon", iconImage);
    if (bannerImage) formData.append("banner", bannerImage);

    ApiRequest.get("/sanctum/csrf-cookie").then(() => {
      ApiRequest.post("/api/community/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", //required!!
        },
      })
        .then((response) => {
          if (response.status === 201) {
            SetSuccess("Community Created!");
            navigate(`/r/${response?.data?.community_name}`, { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.status < 400) {
            SetException(err.message);
            return;
          }
          if (err.status >= 500) {
            SetException("Server error");
            return;
          }
          SetError(err?.response?.data?.errors);
        });
    });
  };

  return (
    <section className="w-[600px] h-fit max-sm:w-[400px] flex flex-col gap-3 mt-5 mb-10">
      <div className="flex">
        <h1 className="text-white text-3xl font-bold max-sm:text-lg">
          Create Community
        </h1>
      </div>

      <form
        method="post"
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col gap-5 "
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Community name"
            className="w-full h-[40px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white"
            onChange={(e) => SetName(e.target.value)}
            required
          />
          <p className="text-xs text-red-500 italic">
            {error && error.name
              ? error.name.map((err) => {
                  return err;
                })
              : null}
          </p>
        </div>
        <div>
          <textarea
            placeholder="Community description"
            name="desc"
            cols="30"
            rows="10"
            className="w-full px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-lg text-white"
            onChange={(e) => SetDescription(e.target.value)}
            required
          ></textarea>
          <p className="text-xs text-red-500 italic">
            {error && error.desc
              ? error.desc.map((err) => {
                  return err;
                })
              : null}
          </p>
        </div>

        {iconImage ? (
          <div className="w-dull h-fit flex items-center justify-around">
            <h2 className="text-white text-lg">Icon Image preview: </h2>
            <div className="w-[200px] h-[200px] relative rounded-lg ">
              <img
                className="w-full h-full object-contain"
                ref={iconImageRef}
                src=""
                alt="preview"
              />
              <span
                className="absolute w-6 h-6 bg-red-500 cursor-pointer rounded-full top-2 right-2 flex justify-center items-center text-white"
                onClick={() => SetIconImage(null)}
              >
                X
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative flex justify-center items-center ">
              <input
                type="file"
                name="icon"
                id="image"
                accept="image/*"
                onChange={(e) =>
                  ImageReader(e, SetException, SetIconImage, iconImageRef)
                }
                className="opacity-0 w-[500px] h-[160px] absolute top-0 left-0 right-0 bottom-0 mx-auto cursor-pointer bg-red-400 rounded-lg"
              />
              <button className="flex justify-center items-center gap-5 w-[500px] h-[160px] cursor-pointer bg-[#192028] text-white rounded-lg">
                <span className="w-24 h-24 rounded-full bg-gray-500 flex justify-center items-center">
                  <div className="w-11 h-11">
                    <img src={UploadIcon} alt="" />
                  </div>
                </span>
                <p className="text-sm">Upload Icon Image</p>
              </button>
            </div>
            <p className="text-xs text-red-500 italic">
              {error && error.icon
                ? error.icon.map((err) => {
                    return err;
                  })
                : null}
            </p>
          </div>
        )}

        {bannerImage ? (
          <div className="w-dull h-fit flex flex-col justify-center">
            <h2 className="text-white text-lg">Banner Image preview: </h2>
            <div className="w-[600px] h-[200px] relative rounded-lg ">
              <img
                className="w-full h-full object-cover rounded-xl"
                ref={bannerImageRef}
                src=""
                alt="preview"
              />
              <span
                className="absolute w-6 h-6 bg-red-500 cursor-pointer rounded-full top-2 right-2 flex justify-center items-center text-white"
                onClick={() => SetBannerImage(null)}
              >
                X
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative flex justify-center items-center ">
              <input
                type="file"
                name="icon"
                id="image"
                accept="image/*"
                onChange={(e) =>
                  ImageReader(e, SetException, SetBannerImage, bannerImageRef)
                }
                className="opacity-0 w-[500px] h-[160px] absolute top-0 left-0 right-0 bottom-0 mx-auto cursor-pointer bg-red-400 rounded-lg"
              />
              <button className="flex justify-center items-center gap-5 w-[500px] h-[160px] cursor-pointer bg-[#192028] text-white rounded-lg">
                <span className="w-24 h-24 rounded-full bg-gray-500 flex justify-center items-center">
                  <div className="w-11 h-11">
                    <img src={UploadIcon} alt="" />
                  </div>
                </span>
                <p className="text-sm">Upload banner Image</p>
              </button>
            </div>
            <p className="text-xs text-red-500 italic">
              {error && error.banner
                ? error.banner.map((err) => {
                    return err;
                  })
                : null}
            </p>
          </div>
        )}

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
  );
};

export default CreateCommunity;
