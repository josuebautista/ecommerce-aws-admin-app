import Layout from '@/components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const DeleteProduct = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null)
  const { deleteproduct } = router.query;
  useEffect(() => {
    if(deleteproduct === null){
      return;
    }
    axios.get('/api/products?id=' + deleteproduct).then(response => {
      setProductInfo(response.data)
    })
  }, [deleteproduct])

  const deleteProduct = async () => {
    await axios.delete('/api/products?id=' + id);
    goBack();
  }

  const goBack = () => {
    router.push('/products');
  }

  return (
    <Layout>
      <div className='h-screen grid content-center'>
        <div className='text-center text-xl'>
          Do you really want to delete product {productInfo?.title}?
        </div>
        <div className='flex flex-row justify-around my-5'>
          <button onClick={() => deleteProduct()} className='bg-slate-500 text-white px-6 py-2 rounded-xl hover:bg-slate-400'>
            Yes
          </button>
          <button onClick={() => goBack()} className='bg-sky-700 text-white px-6 py-2 rounded-xl hover:bg-sky-500'>
            Cancel
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default DeleteProduct