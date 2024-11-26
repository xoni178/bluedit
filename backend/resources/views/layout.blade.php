<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{ asset('img/bluedit.png') }}">
    @vite('resources/css/app.css')
    <title>Bluedit</title>
</head>

<body class="bg-[#090e13] min-h-screen h-fit">
    <header>
        <x-pagebars.navbar />
    </header>
    <main class="h-screen flex flex-row">
        <div class="ml-[20%] mt-[70px] w-full flex items-center flex-col">
            @yield('content')
        </div>

        <x-pagebars.sidebar />

    </main>
</body>

</html>
