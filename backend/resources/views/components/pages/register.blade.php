@extends('layout')


@section('content')
    <section class="w-[50%] h-fit flex flex-col gap-5 mt-14">
        <form action="/register" method="POST">
            @csrf

            <div class="w-full flex items-center">
                <h1 class="text-white text-3xl font-bold">Register</h1>
            </div>

            <div class="w-full flex flex-row gap-5">
                <div class="w-full  flex flex-col justify-start">
                    <span class="text-sm text-white">Username</span>
                    <input type="username" name="username" placeholder="username"
                        class="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none">
                    @error('username')
                        <p class="text-xs text-red-500 italic">{{ $message }}</p>
                    @enderror
                </div>
                <div class="w-full flex flex-col justify-start">
                    <span class="text-sm text-white">Email</span>
                    <input type="email" name="email" placeholder="example@example.com"
                        class="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none">
                    @error('email')
                        <p class="text-xs text-red-500 italic">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <div class="w-full flex flex-row gap-5">
                <div class="w-[50%] flex flex-col justify-start">
                    <span class="text-sm text-white">Password</span>
                    <input type="password" name="password" placeholder="password"
                        class="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none">
                    @error('password')
                        <p class="text-xs text-red-500 italic">{{ $message }}</p>
                    @enderror
                </div>
                <div class="w-[50%] flex flex-col justify-start">
                    <span class="text-sm text-white">Confirm Password</span>
                    <input type="password" name="password_confirmation" placeholder="confirm password"
                        class="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none">
                    @error('password_confirmation')
                        <p class="text-xs text-red-500 italic">{{ $message }}</p>
                    @enderror
                </div>

            </div>



            <div class="flex justify-between">
                <div class="w-[74px]">
                    <button type="submit"
                        class="w-[80px] h-[40px] bg-[#3278cd] flex justify-center items-center rounded-full border border-[#192028] hover:bg-[#020c18] hover:cursor-pointer">
                        <p class="text-white">Submit</p>
                    </button>


                </div>
                <a href="/login" class="bg-transparent text-white text-sm hover:underline" onclick=" ">Already a member?
                    Login.</a>
            </div>
        </form>


    </section>
@endsection
