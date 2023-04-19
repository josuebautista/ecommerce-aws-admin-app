import Layout from '@/components/Layout'
import Title from '@/components/Title';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { DotSpinner } from '@uiball/loaders'

const Products = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/products').then(response => {
      //console.log(response.data);
      setLoading(false);
      setProducts(response.data)
    })
  }, [])

  return (
    <Layout>
      <Title>Products</Title>
      <Link className='bg-green-700 text-white p-2 rounded-lg hover:bg-green-500 duration-150' href={'/products/new'}>
        Add New Product
      </Link>
        {
          loading && (
            <div className='w-full h-full grid justify-center content-center'>
              <DotSpinner size={60} color='#0C4A6E' />
            </div>
          )
        }
      <div className='w-full h-full my-5 overflow-y-auto'>
        <table className='basic'>
          <thead>
            <tr>
              <td>Product Name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              products !== null && (
                products.map(product => (
                  <tr key={product._id}>
                    <td>{product.title}</td>
                    <td className='flex flex-row'>
                      <Link href={'/products/edit/' + product._id} className='bg-sky-700 py-1 px-3 rounded-lg text-white hover:bg-sky-500 flex basis-1/2 mx-2 items-center justify-center'>
                        <HiOutlinePencilSquare size={22} />
                        Edit
                      </Link>
                      <Link href={'/products/delete/' + product._id} className='bg-red-700 py-1 px-3 rounded-lg text-white hover:bg-red-500 flex basis-1/2 mx-2 items-center justify-center'>
                        <HiOutlineTrash size={22} />
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>

      </div>
    </Layout>
  )
}

export default Products;