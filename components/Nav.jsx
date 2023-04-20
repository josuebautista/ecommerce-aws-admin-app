import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { HiOutlineBuildingStorefront, HiOutlineHome, HiOutlineShoppingCart, HiOutlineRectangleStack, HiOutlineShoppingBag, HiOutlineCog8Tooth } from "react-icons/hi2";

export const Nav = () => {
  const inactiveLink = 'flex px-2 text-lg border-b-2 py-3 border-sky-700 rounded-l-lg hover:bg-sky-50 hover:text-black';
  const activeLink = inactiveLink + ' bg-sky-50 text-black';
  const rounter = useRouter();
  const { pathname } = rounter;
  return (
    <aside className='py-3 pl-3 text-white '>
      <div className='flex text-2xl pb-3'>
        <HiOutlineBuildingStorefront size={32} />
        <span className='pl-2'>Ecommerce Admin</span>
      </div>
      <nav className='pl-2'>
        <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
          <HiOutlineHome size={26} className='mr-2'/>
          Dashboard
        </Link>
        <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
          <HiOutlineShoppingCart size={26} className='mr-2'/>
          Products
        </Link>
        <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
          <HiOutlineRectangleStack size={26} className='mr-2'/>
          Categories
        </Link>
        <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <HiOutlineShoppingBag size={26} className='mr-2'/>
          Orders
        </Link>
        <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <HiOutlineCog8Tooth size={26} className='mr-2'/>
          Settings
        </Link>
      </nav>
    </aside>
  )
}
