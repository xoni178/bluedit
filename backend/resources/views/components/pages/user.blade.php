@extends('layout')

@section('content')
    <section class="w-full">
        <div class="w-full flex items-center flex-col">
            <div class="w-[60%] h-[200px] flex flex-row justify-center items-center gap-5">
                <div class="flex flex-row justify-center items-center gap-5">
                    <div>
                        <x-svg.user-icon :size="64" />
                    </div>
                    <h1 class="text-white text-3xl">{{ $user->username }}</h1>
                </div>
                <div class="w-1/2 h-1/2 bg-black flex flex-row items-center p-5 rounded-lg">
                    <div class="w-full text-white flex flex-col items-center">
                        <p class="text-lg">{{ $user->posts_karma }}</p>
                        <p class="text-sm text-gray-400">Post karma</p>
                    </div>
                    <div class="w-full text-white flex flex-col items-center">
                        <p class="text-lg">{{ $user->comments_karma }}</p>
                        <p class="text-sm text-gray-400">Comment karma</p>
                    </div>
                    <div class="w-full text-white flex flex-col items-center">
                        <p class="text-lg ">{{ $user->created_at->format('Y-m-d') }}</p>
                        <p class="text-sm text-gray-400">Cake day</p>
                    </div>

                </div>

            </div>

            <div>
                <ul class="text-white flex flex-row gap-10">
                    <x-buttons.simple :active="request()->is('users/*')" link="/">Posts</x-buttons.simple>
                    <x-buttons.simple :active="request()->is('users/*/comments')" link="/">Comments</x-buttons.simple>
                    <x-buttons.simple :active="request()->is('users/*/upvoted')" link="/">Upvoted</x-buttons.simple>
                    <x-buttons.simple :active="request()->is('users/*/downvoted')" link="/">Downvoted</x-buttons.simple>
                </ul>
            </div>
        </div>
        <div class="flex flex-col gap-5 mt-14 items-center">
            @if ($posts->count())
                @foreach ($posts as $post)
                    <x-post :post="$post" />
                @endforeach
            @endif
        </div>
    </section>

@endsection
