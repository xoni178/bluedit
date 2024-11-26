@extends('layout')

@section('content')

    <div class="flex flex-col gap-5  mt-14">

        @if ($posts->count())
            @foreach ($posts as $post)
                <x-post :post="$post" />
            @endforeach
        @endif

    </div>
@endsection
