import Layout from "@/components/Layout";
import { Nav } from "@/components/Nav";
import Title from "@/components/Title";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

const Home = () => {
  const { data: session } = useSession();
  

  return (
    <Layout>
      <Title>Hello, {session?.user.name}</Title>
    </Layout>
  )

}
export default Home;