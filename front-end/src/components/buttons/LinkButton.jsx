export default function LinkButton() {
  return (
    <a
      href="/r/{{ $link }}"
      className="w-full h-[40px] bg-transparent hover:bg-[#192028] flex flex-row justify-start items-center gap-3 p-2 rounded"
    >
      {/* @if ($type === 'link')
        @if ($isHome)
            <div><x-svg.house-svg /></div>
        @else
            <div><x-svg.popular-svg /></div>
        @endif
    @else
        <div className="w-8 h-8 bg-gray-400 rounded-full"><img src="" alt=""></div>
    @endif */}

      <div>
        {/* <p className="text-white text-[15px] hover:underline">{{ $type === 'community' ? 'r/' : null }}{{ $slot }}
        </p> */}
      </div>
    </a>
  );
}
