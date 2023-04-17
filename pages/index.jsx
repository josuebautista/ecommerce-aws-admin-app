import { Nav } from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <>
      {
        session ? (
          <div className="bg-sky-900 h-screen w-screen flex overflow-x-hidden">
            <div className="w-1/3 h-screen">
              <Nav/>
            </div>
            <div className="w-2/3 bg-sky-50 my-2 mr-2 rounded-3xl p-4 h-screen">
              sjldf
            </div>
          </div>
        ) : (
          <div className="bg-sky-900 h-screen w-screen flex items-center justify-center">
            <div className="text-center">
              <div className="text-white py-3">Not signed in</div>
              <button className="bg-white rounded-lg p-3 hover:bg-slate-200 transition hover:-translate-y-1 hover:scale-105 duration-300" onClick={() => signIn()}>Login with Google</button>
            </div>
          </div>
        )
      }
    </>
  )

}
  export default Home;