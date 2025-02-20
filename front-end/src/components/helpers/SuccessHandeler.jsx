export default function SuccessHandeler({ message }) {
  return (
    <div className="w-[80%] h-[50px] fixed flex justify-center items-center bg-green-500 left-0 right-0 mx-auto mt-12 rounded z-30">
      <p className="text-white uppercase">{message}</p>
    </div>
  );
}
