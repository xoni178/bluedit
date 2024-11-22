<nav class="w-full h-[60px] bg-[#090e13] flex justify-between items-center border-b-[#192028] border-b px-5 fixed ">
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
        <div
            class="w-[125px] h-[40px] bg-transparent flex justify-center items-center gap-3 hover:bg-slate-600 hover:cursor-pointer rounded-2xl">
            <span>
                <svg fill="white" height="20" viewBox="0 0 20 20" width="20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path>
                </svg></span>
            <p class="text-white">Create Post</p>
        </div>
        <div class="hover:cursor-pointer">
            <x-svg.user-icon :size="32" />
        </div>
    </div>
</nav>
