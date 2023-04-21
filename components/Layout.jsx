import { useState } from "react";
import { Nav } from "./Nav";
import { useSession, signIn, signOut } from "next-auth/react";
import { useGlobalContext } from "@/utils/Context";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const {showNavigation, handleNav} = useGlobalContext();

  return (
    <>
      {
        session ? (
          <div className="bg-sky-900 h-screen w-screen flex overflow-hidden">
            {showNavigation ? (
              <>
                <div className="w-1/3 xl:w-1/4 md:w-1/3 sm:w-1/3  h-full">
                  <Nav show={handleNav} showValue={showNavigation} />
                </div>
                <div className="w-2/3 xl:w-3/4 md:w-2/3 bg-sky-50 my-3 mr-2 rounded-3xl p-4 h-full overflow-y-auto ">
                  {children}
                </div>
              </>
            ) : (
              <>
                <div className="w-1/12 xl:w-1/4 md:w-1/12 sm:w-1/3  h-full">
                  <Nav show={handleNav} showValue={showNavigation} />
                </div>
                <div className="w-11/12 xl:w-3/4 md:w-11/12 bg-sky-50 my-3 mr-2 rounded-3xl p-4 h-full overflow-y-auto ">
                  {children}
                </div>

              </>
            )}
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
export default Layout;