import Link from 'next/link';
import React from 'react';
import { HiOutlineBuildingStorefront, HiOutlineHome, HiOutlineShoppingCart, HiOutlineShoppingBag, HiOutlineCog8Tooth } from "react-icons/hi2";

export const Nav = () => {
  const inactiveLink = 'flex px-2 text-lg border-b-2 py-3 border-sky-700 rounded-l-lg hover:bg-sky-50 hover:text-black';
  const activeLink = inactiveLink + ' bg-sky-50 text-black'
  return (
    <aside className='py-3 pl-3 text-white '>
      <div className='flex text-2xl pb-3'>
        <HiOutlineBuildingStorefront size={32} />
        <span>Ecommerce Admin</span>
      </div>
      <nav className='pl-2'>
        <Link href={'/'} className={activeLink}>
          <HiOutlineHome size={26}/>
          Dashboard
        </Link>
        <Link href={'/products'} className={inactiveLink}>
          <HiOutlineShoppingCart size={26}/>
          Products
        </Link>
        <Link href={'/orders'} className={inactiveLink}>
          <HiOutlineShoppingBag size={26}/>
          Orders
        </Link>
        <Link href={'/settings'} className={inactiveLink}>
          <HiOutlineCog8Tooth size={26}/>
          Settings
        </Link>
      </nav>
    </aside>
  )
}
