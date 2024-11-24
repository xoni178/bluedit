@extends('layout')

@section('content')
    <section class="w-[50%] h-fit flex flex-col gap-5">
        <div class="w-full flex items-center">
            <h1 class="text-white text-3xl font-bold">Register</h1>
        </div>
        <div class="w-[50%] flex flex-col justify-start">
            <span class="text-sm text-white">Username</span>
            <input type="text" name="title" placeholder="username"
                class="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white">
        </div>
        <div class="w-[50%] flex flex-col justify-start">
            <span class="text-sm text-white">Email</span>
            <input type="text" name="title" placeholder="example@example.com"
                class="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white">
        </div>

        <div class="w-[50%] flex flex-col justify-start">
            <span class="text-sm text-white">Password</span>
            <input type="password" name="title" placeholder="password"
                class="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white">
        </div>
        <div class="w-[50%] flex flex-col justify-start">
            <span class="text-sm text-white">Confirm Password</span>
            <input ttype="password" name="title" placeholder="password"
                class="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white">
        </div>
        <div class="w-[74px]">
            <x-buttons.simple>Submit</x-buttons.simple>
        </div>
    </section>
@endsection
