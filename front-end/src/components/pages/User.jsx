export default function User() {
  return (
    <section className="w-full">
      <div className="w-full flex items-center flex-col">
        <div className="w-[60%] h-[200px] flex flex-row justify-center items-center gap-5">
          <div className="flex flex-row justify-center items-center gap-5">
            <div>{/* <x-svg.user-icon :size="64" /> */}</div>
            {/* <h1 className="text-white text-3xl">{{ $user->username }}</h1> */}
          </div>
          <div className="w-1/2 h-1/2 bg-black flex flex-row items-center p-5 rounded-lg">
            <div className="w-full text-white flex flex-col items-center">
              {/* <p className="text-lg">{{ $user->posts_karma }}</p> */}
              <p className="text-sm text-gray-400">Post karma</p>
            </div>
            <div className="w-full text-white flex flex-col items-center">
              {/* <p className="text-lg">{{ $user->comments_karma }}</p> */}
              <p className="text-sm text-gray-400">Comment karma</p>
            </div>
            <div className="w-full text-white flex flex-col items-center">
              {/* <p className="text-lg ">{{ $user->created_at->format('Y-m-d') }}</p> */}
              <p className="text-sm text-gray-400">Cake day</p>
            </div>
          </div>
        </div>

        <div>
          <ul className="text-white flex flex-row gap-10">
            {/* <x-buttons.simple :active="request()->is('users/*')" link="/">Posts</x-buttons.simple>
                    <x-buttons.simple :active="request()->is('users//comments')" link="/">Comments</x-buttons.simple>
                    // <x-buttons.simple :active="request()->is('users//upvoted')" link="/">Upvoted</x-buttons.simple>
                    // <x-buttons.simple :active="request()->is('users//downvoted')" link="/">Downvoted</x-buttons.simple> */}
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-14 items-center">
        {/* @if ($posts->count())
                @foreach ($posts as $post)
                    <x-post :post="$post" />
                @endforeach
            @endif */}
      </div>
    </section>
  );
}
