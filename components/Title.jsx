import { useSession } from 'next-auth/react'
import React from 'react'

const Title = ({ children }) => {
  const { data: session} = useSession();
  return (
    <div className='w-full justify-between flex mb-5'>
      <div className='text-sky-900 text-2xl pt-2'>
        {children}
      </div>
      <div className='flex'>
        <img src={session?.user.image} className='rounded-full' width={40} height={40} alt='logo-icon' />
        <span className='pt-2 pl-2' >
          {session?.user.name}
        </span>
      </div>
    </div>
  )
}

export default Title