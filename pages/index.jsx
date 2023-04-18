import Layout from "@/components/Layout";
import { Nav } from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className='w-full justify-between flex'>
        <div className='text-sky-900 text-lg pt-2'>
          Hello, {session?.user.name}
        </div>
        <img src={session?.user.image} className='rounded-full' width={40} height={40} alt='logo-icon' />
      </div>
    </Layout>
  )

}
export default Home;