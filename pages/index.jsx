import { useSession, signIn, signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-cyan-700 h-screen w-screen flex items-center justify-center">
      <div className="text-center">
        {
          session ? (
            <>
              <div className="text-white py-3">Login as {session.user.email}</div>
              <button className="bg-white rounded-lg p-3 hover:bg-slate-200 hover:text-red-600 transition hover:-translate-y-1 hover:scale-105 duration-300" onClick={() => signOut()}>Log Out</button>
            </>
          ) : (
            <>
              <div className="text-white py-3">Not signed in</div>
              <button className="bg-white rounded-lg p-3 hover:bg-slate-200 transition hover:-translate-y-1 hover:scale-105 duration-300" onClick={() => signIn()}>Login with Google</button>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Home