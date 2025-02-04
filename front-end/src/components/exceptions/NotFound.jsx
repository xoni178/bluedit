export default function NotFound({ entity }) {
  return (
    <section className="w-full flex items-center flex-col mt-10">
      <div className="mt-[10%] flex flex-col gap-3 items-center">
        <h1 className="text-[#3278cd] text-7xl">Error 404</h1>
        <h1 className="text-white w-fit h-fit text-2xl">
          {entity} was not found!
        </h1>
      </div>
    </section>
  );
}
