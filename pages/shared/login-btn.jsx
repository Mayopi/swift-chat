import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div className="lg:w-2/3 mt-5">
          <p className="text-subtext text-center mb-3">Signed in as {session.user.email}</p>
          <button className="text-white bg-danger w-full min-h-[40px] rounded py-2 px-2 font-bold uppercase tracker-wider text-xl" onClick={() => signOut()}>
            Sign Out <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()} className="w-full lg:w-2/3 font-bold text-white bg-subtext rounded px-2 py-2">
        <i className="fab fa-google fa-lg"></i> Sign In With Google
      </button>

      <div className="lg:w-2/3 mt-5">
        <button className="text-white bg-accent w-full min-h-[40px] rounded py-2 px-2 font-bold uppercase tracker-wider text-xl">
          Sign In <i className="fa-solid fa-right-to-bracket"></i>
        </button>
      </div>
    </>
  );
}
