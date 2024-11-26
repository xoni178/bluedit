export default function Navbar() {
  return (
    <nav className="w-full h-[60px] bg-[#090e13] flex justify-between items-center border-[#192028] border-b px-5 fixed z-10">
      <a
        className="w-[130px] h-full flex justify-center items-center "
        href="/"
      >
        <div className="w-full h-full flex justify-center items-center">
          <img
            className=" object-contain w-[80%] h-[80%]"
            src="{{ asset('img/bluedit.png') }}"
            alt="bluedit logo"
          />
        </div>
        <div>
          <p className="w-full h-full text-[#3278cd] font-bold text-xl">
            bluedit
          </p>
        </div>
      </a>

      {/* <x-searchbar />
    @guest
        <x-buttons.fancy link="/login">Login</x-buttons.fancy>
    @endguest */}
      {/* @auth */}
      <div
        className="flex flex-row items-center gap-5 p-2"
        onclick="toggleDropdown(event)"
      >
        {/* <x-buttons.create /> */}
        <a className="hover:cursor-pointer" href="/">
          {/* <x-svg.user-icon :size="32" /> */}
        </a>
      </div>
      <div id="drop" className="hidden absolute right-3 top-[60px]">
        <div className="w-[80px] h-[80px] flex flex-col justify-center items-center gap-5 bg-[#192028]   rounded-lg p-3">
          <div>
            <a
              href="/users/{{ Auth::user()->username }}"
              className="bg-transparent text-white text-sm hover:underline select-none"
            >
              profile
            </a>
          </div>
          <div>
            <form action="/logout" method="POST">
              {/* @csrf */}

              <button
                type="submit"
                className="bg-transparent text-sm hover:underline"
              >
                <p className="text-red-500 select-none">Logout</p>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* @endauth */}
    </nav>
  );
}
{
  /* <script>
    isHidden = false;

    function toggleDropdown(e) {
        e.preventDefault();

        dropdown = document.querySelector("#drop");

        isHidden ? dropdown.style.display = "none" : dropdown.style.display = "block"

        isHidden = !isHidden
    }
</script> */
}
