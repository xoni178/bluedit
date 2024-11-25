<nav class="w-full h-[60px] bg-[#090e13] flex justify-between items-center border-b-[#192028] border-b px-5 fixed z-10">
    <a class="w-[130px] h-full flex justify-center items-center " href="/">
        <div class="w-full h-full flex justify-center items-center">
            <img class=" object-cover" src="{{ asset('img/bluedit.png') }}" alt="bluedit logo">
        </div>
        <div>
            <p class="w-full h-full text-[#3278cd] font-bold text-xl">bluedit</p>
        </div>
    </a>

    <x-searchbar />

    <div class="flex flex-row items-center gap-5 p-2">
        <x-buttons.create />
        <div class="hover:cursor-pointer">
            <x-svg.user-icon :size="32" />
        </div>
    </div>
</nav>
