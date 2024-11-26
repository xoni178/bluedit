export default function User() {
  return (
    <section className="w-[50%] h-fit flex flex-col gap-5 mt-14">
      <form action="/register" method="POST">
        {/* @csrf */}

        <div className="w-full flex items-center">
          <h1 className="text-white text-3xl font-bold">Register</h1>
        </div>

        <div className="w-full flex flex-row gap-5">
          <div className="w-full  flex flex-col justify-start">
            <span className="text-sm text-white">Username</span>
            <input
              type="username"
              name="username"
              placeholder="username"
              className="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none"
            />
            {/* @error('username')
                        <p className="text-xs text-red-500 italic">{{ $message }}</p>
                    @enderror */}
          </div>
          <div className="w-full flex flex-col justify-start">
            <span className="text-sm text-white">Email</span>
            <input
              type="email"
              name="email"
              placeholder="example@example.com"
              className="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none"
            />
            {/* @error('email')
                        <p className="text-xs text-red-500 italic">{{ $message }}</p>
                    @enderror */}
          </div>
        </div>

        <div className="w-full flex flex-row gap-5">
          <div className="w-[50%] flex flex-col justify-start">
            <span className="text-sm text-white">Password</span>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none"
            />
            {/* @error('password')
                        <p className="text-xs text-red-500 italic">{{ $message }}</p>
                    @enderror */}
          </div>
          <div className="w-[50%] flex flex-col justify-start">
            <span className="text-sm text-white">Confirm Password</span>
            <input
              type="password"
              name="password_confirmation"
              placeholder="confirm password"
              className="w-full h-[60px] px-5 py-2 bg-transparent border-[1px] border-[#192028] rounded-full text-white outline-none"
            />
            {/* @error('password_confirmation')
                        <p className="text-xs text-red-500 italic">{{ $message }}</p>
                    @enderror */}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-[74px]">
            <button
              type="submit"
              className="w-[80px] h-[40px] bg-[#3278cd] flex justify-center items-center rounded-full border border-[#192028] hover:bg-[#020c18] hover:cursor-pointer"
            >
              <p className="text-white">Submit</p>
            </button>
          </div>
          <a
            href="/login"
            className="bg-transparent text-white text-sm hover:underline"
            onclick=" "
          >
            Already a member? Login.
          </a>
        </div>
      </form>
    </section>
  );
}
