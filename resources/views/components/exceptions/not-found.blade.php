@extends('layout')

@section('content')
    <h1 class="text-white">Username was not found: {{ $exception->getIds()[0] }} </h1>
@endsection
