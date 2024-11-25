@extends('layout')

@section('content')
    <section class="w-full flex flex-col items-center">
        <div class="w-[80%] h-[190px] relative  ">
            <div class="w-full h-[70%] bg-pink-300 rounded-xl">

            </div>
            <div class="flex flex-row justify-between pt-2">
                <div class="ml-[10%] ">
                    <div class=" w-[88px] h-[88px] bg-gray-400 absolute bottom-3 left-6 rounded-full">
                        <img src="" alt="">
                    </div>
                    <div>
                        <h1 class="text-3xl font-bold text-white">r/{{ $community->name }}</h1>
                    </div>
                </div>
                <div class="flex flex-row gap-6">
                    <x-buttons.create />
                    <div
                        class="w-[80px] flex justify-center items-center border-[1px] border-[#192028] rounded-full px-3 py-1 hover:cursor-pointer hover:bg-[#192028]">
                        <p class="text-white">Join</p>
                    </div>
                </div>

            </div>
        </div>
        <div class="flex flex-col gap-5  mt-14">

            @if ($posts->count())
                @foreach ($posts as $post)
                    <x-post :post="$post" />
                @endforeach
            @endif

        </div>
    </section>
@endsection
