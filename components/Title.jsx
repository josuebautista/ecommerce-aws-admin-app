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
    <div className='w-full justify-between flex gap-10 mb-5'>
      <div className='text-sky-900 text-2xl pt-2'>
        {children}
      </div>
      <button onClick={() => setShowMenu(prev => ( !prev))} >
        <img src={session?.user.image} className='rounded-full hover:scale-105 transition duration-200' width={50} height={50} alt='logo-icon' />
      </button>
      {
        showMenu && (
          <button onClick={() => logOut()} className='absolute z-20 top-20 right-0 bg-slate-200 hover:bg-slate-300 rounded-lg mr-10 py-2 px-4'>
            <div className='flex flex-row'>
              <HiOutlineArrowRightOnRectangle size={25} className='mr-2' />
              <div className='text-md'>Log out</div>
            </div>
          </button>
        )
      }
    </div>
  )
}

export default Title