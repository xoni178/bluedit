import { CreateButton, FancyButton } from "../buttons";

export default function Community() {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-[80%] h-[190px] relative  ">
        <div className="w-full h-[70%] bg-pink-300 rounded-xl"></div>
        <div className="flex flex-row justify-between pt-2">
          <div className="ml-[10%] ">
            <div className=" w-[88px] h-[88px] bg-gray-400 absolute bottom-3 left-6 rounded-full">
              <img src="" alt="" />
            </div>
            <div>
              {/* <h1 className="text-3xl font-bold text-white">r/$community->name </h1> */}
            </div>
          </div>
          <div className="flex flex-row gap-6">
            <CreateButton />
            <FancyButton /> {/*Join */}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5  mt-14">
        {/* @if ($posts->count())
            @foreach ($posts as $post)
                <x-post :post="$post" />
            @endforeach
        @endif */}
      </div>
    </section>
  );
}
