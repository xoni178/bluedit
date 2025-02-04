export default function ExceptionsHandeler({ message, SetException }) {
  return (
    <div className="w-[80%] h-[50px] fixed flex justify-between items-center bg-red-500 left-0 right-0 mx-auto mt-12 rounded z-30 px-5">
      <p className="text-white uppercase">{message}</p>
      <span
        className="w-3 h-3 rounded-full hover:cursor-pointer text-white flex justify-center items-center"
        onClick={() => SetException(null)}
      >
        X
      </span>
    </div>
  );
}
