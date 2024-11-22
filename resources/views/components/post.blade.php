<div onclick="location.href='/'"
    class="w-[750px] h-[650px] flex flex-col hover:cursor-pointer hover:bg-[#192028] rounded-xl px-3 border-y-[1px] border-[#192028] shadow-md">
    <div class="flex flex-row w-[40%] items-center gap-1">
        <div>
            <x-buttons.link :type="'community'">something</x-buttons.link>
        </div>
        <span class="w-1 h-1 rounded-full bg-white"></span>
        <div>
            <p class="text-white text-[10px]">13 hours ago</p>
        </div>
    </div>
    <div class="w-full px-2">
        <h1 class="text-2xl text-white">tigsaoFGNAorngoanrgoangrongoNGONGOefaaefe</h1>
    </div>
    <div class="w-full h-[80%] bg-blue-300 my-2 rounded-lg"></div>
    <div class="w-full h-[5%] flex items-center gap-5">
        <div class="flex items-center gap-3 px-3 py-1 bg-[#192028] rounded-full">
            <x-svg.upvote-svg />
            <p class="text-white">10</p>
            <x-svg.downvote-svg />
        </div>
        <div class="flex items-center gap-2 px-3 py-1 bg-[#192028] rounded-full">
            <x-svg.comment-svg />
            <p class="text-white">10</p>
        </div>
    </div>
</div>
