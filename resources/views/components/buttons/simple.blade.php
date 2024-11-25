<a @class([
    'w-fit',
    'px-4',
    'py-2',
    'rounded-full',
    'hover:bg-[#192028]',
    'hover:cursor-pointer',
    'bg-[#192028]' => $active,
    'bg-transparent' => !$active,
]) href="{{ $link }}">
    <p class="text-white">{{ $slot }}</p>
</a>
