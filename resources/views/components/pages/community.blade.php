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
                    <x-buttons.fancy link="/">Join</x-buttons.fancy>
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
