import { ReactComponent as UserSvg } from "../assets/svg/user.svg";
import UseWindowDimensions from "./helpers/UseWindowDimensions";
const UserInfo = ({ user }) => {
  const { width } = UseWindowDimensions();
  return (
    <>
      {width >= 640 ? (
        <div className="w-[700px] h-[200px] flex flex-row justify-center items-center gap-5">
          <div className="flex flex-row justify-center items-center gap-5">
            <div className="w-[64px] h-[64px]">
              <UserSvg />
            </div>
            <h1 className="text-white text-3xl min-w-[70px]">
              {user.username}
            </h1>
          </div>
          <div className="w-[350px] h-[100px] bg-black flex flex-row items-center p-5 rounded-lg">
            <div className="w-full text-white flex flex-col items-center">
              <p className="text-lg">{user.posts_karma}</p>
              <p className="text-sm text-gray-400">Post karma</p>
            </div>
            <div className="w-full text-white flex flex-col items-center">
              <p className="text-lg">{user.comments_karma}</p>
              <p className="text-sm text-gray-400">Comment karma</p>
            </div>
            <div className="w-full text-white flex flex-col items-center">
              <p className="text-lg ">{user.created_at}</p>
              <p className="text-sm text-gray-400">Cake day</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[700px] h-[400px] flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="w-[64px] h-[64px]">
              <UserSvg />
            </div>
            <h1 className="text-white text-3xl">{user.username}</h1>
          </div>
          <div className="w-[350px] h-[100px] bg-black flex flex-row items-center p-5 rounded-lg">
            <div className="w-full text-white flex flex-col items-center">
              <p className="text-lg">{user.posts_karma}</p>
              <p className="text-sm text-gray-400">Post karma</p>
            </div>
            <div className="w-full text-white flex flex-col items-center text-center">
              <p className="text-lg">{user.comments_karma}</p>
              <p className="text-sm text-gray-400">Comment karma</p>
            </div>
            <div className="w-full text-white flex flex-col items-center">
              <p className="text-lg ">{user.created_at}</p>
              <p className="text-sm text-gray-400">Cake day</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
