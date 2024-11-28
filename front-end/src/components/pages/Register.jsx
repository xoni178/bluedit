import { useState } from "react";
import App from "../../App";

import ApiRequest from "../../api/ApiRequest";

import { useBlueditDataContext } from "../../api/DataContext";

import { useNavigate } from "react-router-dom";

export default function User() {
  const { SetAuthUser } = useBlueditDataContext();
  const navigate = useNavigate();

  const [errors, SetErrors] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    ApiRequest.get("/sanctum/csrf-cookie").then(() => {
      ApiRequest.post("api/register", {
        username: "xoni121",
        email: "xoni631@example.net",
        password: "xonixoni",
        password_confirmation: "xonixoni",
      })
        .then((userData) => {
          SetAuthUser(userData.data);
          localStorage.setItem("authUser", JSON.stringify(userData.data));
          navigate("/");
        })
        .catch((err) => {
          const errors = err.response.data.errors;
          console.log(errors);
          SetErrors(errors);
        });
    });
  };

  return (
    <App>
      <section className="w-[50%] h-fit flex flex-col gap-5 mt-14">
        <form action="/register" method="POST" onSubmit={(e) => onSubmit(e)}>
          <div className="w-full flex items-center">
            <h1 className="text-white text-3xl font-bold">Register</h1>
          </div>

          <div className="w-full flex flex-row gap-5">
            <div className="w-full  flex flex-col justify-start">
              <span className="text-sm text-white">Username</span>
              <input
                type="username"
                name="username"
                placeholder="username"
                className="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none"
                required
              />
              {errors ? (
                errors?.username ? (
                  <div className="text-xs text-red-500 italic">
                    {errors.username.map((error, index) => {
                      return <span key={index}>{error}</span>;
                    })}
                  </div>
                ) : null
              ) : null}
            </div>
            <div className="w-full flex flex-col justify-start">
              <span className="text-sm text-white">Email</span>
              <input
                type="email"
                name="email"
                placeholder="example@example.com"
                className="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none"
                required
              />
              {errors ? (
                errors?.email ? (
                  <span className="text-xs text-red-500 italic">
                    {errors.email.map((error, index) => {
                      return <span key={index}>{error}</span>;
                    })}
                  </span>
                ) : null
              ) : null}
            </div>
          </div>

          <div className="w-full flex flex-row gap-5">
            <div className="w-[50%] flex flex-col justify-start">
              <span className="text-sm text-white">Password</span>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none"
                required
              />
              {errors ? (
                errors?.password ? (
                  <span className="text-xs text-red-500 italic">
                    {errors.password.map((error, index) => {
                      return <span key={index}>{error}</span>;
                    })}
                  </span>
                ) : null
              ) : null}
            </div>
            <div className="w-[50%] flex flex-col justify-start">
              <span className="text-sm text-white">Confirm Password</span>
              <input
                type="password"
                name="password_confirmation"
                placeholder="confirm password"
                className="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none"
                required
              />
              {errors ? (
                errors?.password_confirmation ? (
                  <span className="text-xs text-red-500 italic">
                    {errors.password_confirmation.map((error, index) => {
                      return <span key={index}>{error}</span>;
                    })}
                  </span>
                ) : null
              ) : null}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="w-[74px]">
              <button
                type="submit"
                className="w-[80px] h-[40px] bg-[#3278cd] flex justify-center items-center rounded-full border border-[#192028] hover:bg-[#020c18] hover:cursor-pointer"
              >
                <p className="text-white">Submit</p>
              </button>
            </div>
            <a
              href="/login"
              className="bg-transparent text-white text-sm hover:underline"
              onclick=" "
            >
              Already a member? Login.
            </a>
          </div>
        </form>
      </section>
    </App>
  );
}
