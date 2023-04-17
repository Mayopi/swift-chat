export default function LoginButton({ signIn }) {
  return (
    <>
      <button onClick={() => signIn()} className="w-full lg:w-2/3 font-bold text-white bg-subtext rounded px-2 py-2 flex gap-2 justify-center items-center min-h-[40px]">
        <i className="fab fa-google fa-xl"></i>
        <i className="fab fa-discord fa-xl"></i>
      </button>

      <div className="lg:w-2/3 mt-5">
        <button className="text-white bg-accent w-full min-h-[40px] rounded py-2 px-2 font-bold uppercase tracker-wider text-xl">
          Sign In <i className="fa-solid fa-right-to-bracket"></i>
        </button>
      </div>
    </>
  );
}
