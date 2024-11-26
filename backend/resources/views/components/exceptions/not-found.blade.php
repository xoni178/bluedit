@extends('layout')

@section('content')
    <section class="w-full flex items-center flex-col ml-[20%] mt-10">
        <div class="mt-[10%] flex flex-col gap-3 items-center">
            <h1 class="text-[#3278cd] text-7xl">Error 404</h1>
            <h1 class="text-white w-fit h-fit text-2xl">{{ $name }} was not found!</h1>
        </div>


    </section>
@endsection
