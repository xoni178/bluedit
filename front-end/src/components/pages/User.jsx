import { useEffect, useState } from "react";

import ApiRequest from "../../api/ApiRequest";

import Post from "../Post";
import UserInfo from "../UserInfo";

import { useNavigate, useParams, useLocation } from "react-router-dom";

import { SimpleButton } from "../buttons";

import { useBlueditDataContext } from "../../api/DataContext";

import Loading from "../helpers/Loading";
import NotFound from "../exceptions/NotFound";

export default function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();

  const { SetException } = useBlueditDataContext();

  const [showMessage, setShowMessage] = useState(false);

  const [user, SetUser] = useState({});
  const [posts, SetPosts] = useState([]);

  const [notFound, SetNotFound] = useState(false);

  useEffect(() => {
    setShowMessage(false);

    ApiRequest.get(`/api/users/${username}`)
      .then((response) => {
        console.log(response);
        SetUser(response?.data?.data?.user);
        SetPosts(response?.data?.data?.posts);

        if (posts.length === 0) {
          setShowMessage(true);
        }
      })
      .catch((err) => {
        SetException(err.message);

        if (err.status === 404) {
          SetNotFound(true);
        }
      });
  }, []);

  return (
    <section className="w-full">
      {notFound ? (
        <NotFound entity={username} />
      ) : (
        <>
          <div className="w-full flex items-center flex-col">
            <UserInfo user={user} />

            <div>
              <ul className="text-white flex flex-row gap-10">
                <SimpleButton
                  link={`/users/${username}`}
                  active={
                    location.pathname === `/users/${username}` ? true : false
                  }
                  slot={"Posts"}
                />
                <SimpleButton
                  link={`/users/${username}/comments`}
                  active={
                    location.pathname === `/users/${username}/comments`
                      ? true
                      : false
                  }
                  slot={"Comments"}
                />
                <SimpleButton
                  link={`/users/${username}/upvotes`}
                  active={
                    location.pathname === `/users/${username}/upvotes`
                      ? true
                      : false
                  }
                  slot={"Upvoted"}
                />
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-14 items-center">
            {posts.length === 0 ? (
              showMessage ? (
                <div className="flex justify-center items-center h-[50vh]">
                  <h1 className="text-white text-3xl max-sm:text-lg">
                    No posts to show
                  </h1>
                </div>
              ) : (
                <Loading />
              )
            ) : (
              posts.map((post, index) => {
                const postTitle = post.title.replaceAll(" ", "_");

                return (
                  <Post
                    key={index}
                    post={post}
                    displayUsername={false}
                    onClick={() =>
                      navigate(`/posts/${post.post_id}/${postTitle}`)
                    }
                  />
                );
              })
            )}
            {posts.length !== 0 ? (
              showMessage ? (
                <div className="flex justify-center items-center h-[100px]">
                  <h1 className="text-white text-xl">No more posts to show</h1>
                </div>
              ) : (
                <Loading />
              )
            ) : null}
          </div>
        </>
      )}
    </section>
  );
}
