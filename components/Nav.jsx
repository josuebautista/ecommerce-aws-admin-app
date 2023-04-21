import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineXMark, HiOutlineBuildingStorefront, HiOutlineHome, HiOutlineShoppingCart, HiOutlineRectangleStack, HiOutlineShoppingBag, HiOutlineCog8Tooth } from "react-icons/hi2";

export const Nav = ({ show, showValue }) => {

  const inactiveLink = 'flex px-2 text-lg border-b-2 py-3 border-sky-700 rounded-l-lg hover:bg-sky-50 hover:text-black flex sm:flex-row';
  const activeLink = inactiveLink + ' bg-sky-50 text-black';
  const rounter = useRouter();
  const { pathname } = rounter;

  return (
    <aside className='py-3 pl-3 text-white'>
      <div className='flex text-2xl pb-3 mb-3'>
        {showValue ? (
          <>
            <HiOutlineBuildingStorefront size={32} />
            <span className='pl-2'>Ecommerce Admin</span>
            <button onClick={show} className="hover:text-sky-600 ml-3">
            <HiOutlineXMark size={35}/>
            </button>
          </>
        ) : (
          <button onClick={show} className="hover:text-sky-600">
            <HiOutlineBuildingStorefront size={40} />
          </button>

        )
        }
      </div>
      <nav className='pl-2'>
        <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
          <HiOutlineHome size={26} className='mr-2' />
          {showValue && (
            <div>Dashboard</div>
          )}
        </Link>
        <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
          <HiOutlineShoppingCart size={26} className='mr-2' />
          {showValue && (
            <div>Products</div>
          )}
        </Link>
        <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
          <HiOutlineRectangleStack size={26} className='mr-2' />
          {showValue && (
            <div>Categories</div>
          )}
        </Link>
        <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <HiOutlineShoppingBag size={26} className='mr-2' />
          {showValue && (
            <div>Orders</div>
          )}
        </Link>
        <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <HiOutlineCog8Tooth size={26} className='mr-2' />
          {showValue && (
            <div>Settings</div>
          )}
        </Link>
      </nav>
    </aside>
  )
}
