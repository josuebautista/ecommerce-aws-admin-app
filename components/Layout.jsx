import { useState } from "react";
import { Nav } from "./Nav";
import { useSession, signIn } from "next-auth/react";
import { useGlobalContext } from "@/utils/Context";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const { showNavigation} = useGlobalContext();

  return (
    <div className="w-screen h-screen">
      {
        session ? (
          <div className="bg-sky-900 h-screen w-screen overflow-hidden">
            {showNavigation ? (
              <div className="w-full h-full flex">
                <div className="xl:w-1/4 lg:w-1/4 md:w-1/3 sm:w-2/3 h-full">
                  <Nav/>
                </div>
                <div className="xl:w-3/4 lg:w-3/4 md:w-2/3 sm:w-1/3 bg-sky-50 my-3 mr-2 rounded-3xl p-4 h-full overflow-y-auto ">
                  {children}
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex">
                <div className="xl:w-1/12 lg:w-1/12 md:w-1/12 w-2/12 h-full">
                  <Nav/>
                </div>
                <div className="xl:w-11/12 lg:w-11/12 md:w-11/12 w-10/12 bg-sky-50 my-3 mr-2 rounded-3xl p-4 h-full overflow-y-auto ">
                  {children}
                </div>

              </div>
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
    </div>
  )

}
export default Layout;