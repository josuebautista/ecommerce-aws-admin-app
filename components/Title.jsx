import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

const Title = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  const logOut = async () => {
    setShowMenu(false);
    await router.push('/');
    await signOut();
  }

  return (
    <div className='w-full justify-between flex mb-5'>
      <div className='text-sky-900 text-2xl pt-2'>
        {children}
      </div>
      <button onClick={() => setShowMenu(prev => ( !prev))} className='flex'>
        <img src={session?.user.image} className='rounded-full hover:scale-105 transition duration-200' width={40} height={40} alt='logo-icon' />
        <span className='pt-2 pl-2 sm:hidden' >
          {session?.user.name}
        </span>
      </button>
      {
        showMenu && (
          <button onClick={() => logOut()} className='absolute z-20 top-20 right-0 bg-slate-200 hover:bg-slate-300 rounded-lg mr-10 py-2 px-4'>
            <div className='flex sm:grid'>
              <HiOutlineArrowRightOnRectangle size={25} className='mr-2' />
              <div className='text-md '>Log out</div>
            </div>
          </button>
        )
      }
    </div>
  )
}

export default Title