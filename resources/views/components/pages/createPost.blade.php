@extends('layout')

@section('content')
    <section class="w-[50%] h-fit flex flex-col gap-3">
        <div class="flex">
            <h1 class="text-white text-3xl font-bold">Create Post</h1>
        </div>
        <div class="w-[50%]">
            <input type="text" name="" id="" placeholder="Select a community"
                class="w-full h-[40px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white">
        </div>
        <div class="w-[40%] flex gap-4 text-white">
            <x-buttons.simple>Text</x-buttons.simple>
            <x-buttons.simple>Image</x-buttons.simple>
            <x-buttons.simple>Video</x-buttons.simple>
        </div>
        <div>
            <input type="text" name="title" placeholder="Title"
                class="w-full h-[40px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white">
        </div>
        <div>
            <textarea placeholder="Body" name="body" cols="30" rows="10"
                class="w-full px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-lg text-white"></textarea>
        </div>
    </section>
@endsection
