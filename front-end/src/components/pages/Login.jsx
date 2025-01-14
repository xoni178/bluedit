import { useState } from "react";
import App from "../../App";

import ApiRequest from "../../api/ApiRequest";

import { useBlueditDataContext } from "../../api/DataContext";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const { SetAuthUser } = useBlueditDataContext();
  const navigate = useNavigate();
  const [email, SetEmail] = useState("lance63@example.net");
  const [password, SetPassword] = useState("password");

  const [error, SetError] = useState(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    ApiRequest.get("/sanctum/csrf-cookie").then(() => {
      console.log(email, password);
      ApiRequest.post("api/login", {
        email,
        password,
      })
        .then((userData) => {
          console.log(userData);
          SetAuthUser(userData.data);
          localStorage.setItem("authUser", JSON.stringify(userData.data));
          navigate("/");
        })
        .catch((error) => {
          SetError(error.response?.data?.errors);
          console.log(error);
        });
    });
  };

  return (
    <App>
      <section className="w-[50%] h-fit flex flex-col gap-5 mt-14">
        <div className="w-full flex items-center">
          <h1 className="text-white text-3xl font-bold">Log in</h1>
        </div>
        <form action="/login" method="POST" onSubmit={(e) => handleOnSubmit(e)}>
          <div className="w-[50%] flex flex-col gap-5">
            <div className="w-full flex flex-col justify-start">
              <span className="text-sm text-white">Email</span>
              <input
                type="email"
                name="email"
                placeholder="example@example.com"
                className="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none"
                onChange={(e) => SetEmail(e.target.value)}
                // required
              />

              <p className="text-xs text-red-500 italic">
                {error
                  ? error.email.map((err) => {
                      return err;
                    })
                  : null}
              </p>
            </div>
            <div className="w-full flex flex-col justify-start">
              <span className="text-sm text-white">Password</span>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none"
                onChange={(e) => SetPassword(e.target.value)}
                // required
              />
              <p className="text-xs text-red-500 italic">
                {error
                  ? error.password.map((err) => {
                      return err;
                    })
                  : null}
              </p>
            </div>
          </div>

          <div className="flex justify-between w-[50%]">
            <div className="w-[74px]">
              <button
                type="submit"
                className="w-[80px] h-[40px] bg-[#3278cd] flex justify-center items-center rounded-full border border-[#192028] hover:bg-[#020c18] hover:cursor-pointer"
              >
                <p className="text-white">Submit</p>
              </button>
            </div>
            <a
              href="/register"
              className="bg-transparent text-white text-sm hover:underline"
              onclick=" "
            >
              Not a member? Register.
            </a>
          </div>
        </form>
      </section>
    </App>
  );
}
