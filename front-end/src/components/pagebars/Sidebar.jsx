import { LinkButton } from "../buttons";
export default function Sidebar() {
  return (
    <section className="w-[20%] h-screen border-r-[1px] border-[#192028] p-5 flex flex-col gap-10 overflow-scroll fixed top-[60px]">
      <div className="flex flex-col gap-2 border-b-[1px] border-[#192028] pb-5">
        <LinkButton isHome={true} type={"link"} slot={"Home"} />
        <LinkButton isHome={false} type={"link"} slot={"Popular"} />
      </div>
      <div className="flex flex-col gap-2 border-b-[1px] border-[#192028] pb-5">
        {/* <x-buttons.collapsible>Recent</x-buttons.collapsible>*/}
        <LinkButton isHome={false} type={"community"} slot={"Something"} />
      </div>
      <div className="flex flex-col gap-2 border-b-[1px] border-[#192028] pb-5">
        {/* <x-buttons.collapsible>Communities</x-buttons.collapsible> */}

        {/* @if (Auth::user()->subcribed_communities->count())
            @foreach (Auth::user()->subcribed_communities as $community)
                <x-buttons.link :link="$community->name" :type="'community'">{{ $community->name }}</x-buttons.link>
            @endforeach
        @endif */}
      </div>
    </section>
  );
}
