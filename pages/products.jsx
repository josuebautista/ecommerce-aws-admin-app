import Layout from '@/components/Layout'
import Title from '@/components/Title';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { DotSpinner } from '@uiball/loaders'
import { useRouter } from 'next/router';

const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products').then(response => {
      setLoading(false);
      setProducts(response.data)
    })
  }, [])

  const handleNewProduct = () => {
    router.push('/products/new');
  }
  return (
    <Layout>
      <Title>Products</Title>
      <button onClick={() => handleNewProduct()} className='text-white bg-green-700 my-2 px-5 py-2 rounded-lg hover:bg-green-500 hover:scale-105 hover:-translate-y-1 transition duration-200 disabled:opacity-75'>
        Add New Product
      </button>
      {loading && (
          <div className='w-full h-full grid justify-center content-center'>
            <DotSpinner size={60} color='#0C4A6E' />
          </div>
      )}
      <div className='w-full h-full my-5 pb-5'>
        <table className='w-full'>
          <thead className='bg-sky-100'>
            <tr>
              <td className='font-semibold text-xl py-5'>Product Name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products !== null && (
              products.map(product => (
                <tr key={product._id} className='border-t'>
                  <td className='py-4'>{product.title}</td>
                  <td className='flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col py-2'>
                    <Link href={'/products/edit/' + product._id} className='bg-sky-700 py-1 rounded-lg text-white hover:bg-sky-500 flex xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full m-1 items-center justify-center'>
                      <HiOutlinePencilSquare size={25} />
                      Edit
                    </Link>
                    <Link href={'/products/delete/' + product._id} className='bg-red-700 py-1 rounded-lg text-white hover:bg-red-500 flex xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full m-1 items-center justify-center'>
                      <HiOutlineTrash size={25} />
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Products;