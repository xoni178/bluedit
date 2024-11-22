<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/app.css')
    <title>Bluedit</title>
</head>

<body class="bg-[#090e13] min-h-screen h-fit">
    <header>
        <x-pagebars.navbar />
    </header>
    <main class="h-screen flex flex-row ">
        <x-pagebars.sidebar />
        @yield('content')
    </main>
</body>

</html>
