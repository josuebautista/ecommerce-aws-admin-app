import { useGlobalContext } from '@/utils/Context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineXMark, HiOutlineBuildingStorefront, HiOutlineHome, HiOutlineShoppingCart, HiOutlineRectangleStack, HiOutlineShoppingBag, HiOutlineCog8Tooth } from "react-icons/hi2";

export const Nav = () => {
  const { showNavigation, handleNav } = useGlobalContext();
  const inactiveLink = 'flex px-2 text-lg border-b-2 py-3 border-sky-700 rounded-l-lg hover:bg-sky-50 hover:text-black flex sm:flex-row';
  const activeLink = inactiveLink + ' bg-sky-50 text-sky-800 ';
  const rounter = useRouter();
  const { pathname } = rounter;

  return (
    <aside className='py-3 xl:pl-3 lg:pl-3 md:pl-3 pl-1 text-white'>
      <div className='flex text-2xl pb-3 mb-3'>
        {showNavigation ? (
          <div className='flex justify-between w-full'>
            <div className="flex">
              <HiOutlineBuildingStorefront size={32} />
              <span className='pl-2'>Ecommerce Admin</span>
            </div>
            <button onClick={handleNav} className="hover:text-sky-600 ml-3 mx-2 hover:translate-y-1 hover:scale-105 transition duration-200">
              <HiOutlineXMark size={35} />
            </button>
          </div>
        ) : (
          <button onClick={handleNav} className="hover:text-sky-600 hover:scale-105 transition duration-200">
            <HiOutlineBuildingStorefront size={40} className='' />
          </button>

        )
        }
      </div>
      <nav className='xl:pl-2 lg:pl-2 md:pl-2 sm:p-0'>
        <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
          <HiOutlineHome size={26} className='mr-2' />
          {showNavigation && (
            <div>Dashboard</div>
          )}
        </Link>
        <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
          <HiOutlineShoppingCart size={26} className='mr-2' />
          {showNavigation && (
            <div>Products</div>
          )}
        </Link>
        <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
          <HiOutlineRectangleStack size={26} className='mr-2' />
          {showNavigation && (
            <div>Categories</div>
          )}
        </Link>
        <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <HiOutlineShoppingBag size={26} className='mr-2' />
          {showNavigation && (
            <div>Orders</div>
          )}
        </Link>
        <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <HiOutlineCog8Tooth size={26} className='mr-2' />
          {showNavigation && (
            <div>Settings</div>
          )}
        </Link>
      </nav>
    </aside>
  )
}
