import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineDocumentArrowUp } from 'react-icons/hi2';
import { LeapFrog } from '@uiball/loaders';
import Link from 'next/link';

const ProductForm = ({ _id, title: existingTitle, description: existingDescription, price: existingPrice, images: existingImages }) => {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || [])
  const [goToProducts, setGoToProducts] = useState(false);
  const [upload, setUpload] = useState(false);

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price, images };
    if (_id) {
      await axios.put('/api/products', { ...data, _id });
    } else {
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push('/products')
  }

  const uploadImages = async (e) => {
    setUpload(true);
    console.log(e.target.files);
    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data)
      console.log(res.data);
      setImages(oldImages => {
        return [...oldImages, ...res.data.links];
      });
    }
    setUpload(false);
  }

  return (
    <form className='w-full'>
      {
        !_id && (
          <Link href={'/products'} className='bg-sky-700 px-3 my-4 py-1 w-1/6 flex rounded-lg text-white hover:bg-sky-500 transition duration-200'>
                <HiOutlineChevronLeft size={25} className='mt-1' /> <span className='text-xl '>Back</span>
          </Link>
        )
      }
      <label>Product Name:</label>
      <input type='text' placeholder='Product name' value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Images:</label>
      <div className='w-full my-2 flex'>

        <div className='w-32 h-32 border border-sky-900 rounded-xl bg-slate-100'>
          <label>
            <div className='w-full h-full grid justify-center items-center hover:scale-105 hover:-translate-y-1 hover:text-black/50 duration-200'>
              <HiOutlineDocumentArrowUp size={45} />
              <input type='file' className='hidden' onChange={(e) => uploadImages(e)} />
            </div>
          </label>
        </div>
        {
          !!images?.length && images.map((link, index) => (
            <div key={index} className='h-32 border border-sky-900 rounded-xl mx-2 overflow-hidden'>
              <img src={link} className='rounded-xl object-center h-32 object-cover' alt={link} />
            </div>
          ))
        }
        {
          upload && (
            <div className='w-32 h-32 border bg-slate-200 border-sky-900 rounded-xl mx-2 grid content-center justify-center'>
              <LeapFrog size={45} color='#0C4A6E' />
            </div>
          )
        }
        {
          !!images?.length || !upload && (
            <div className='py-2 h-32 grid content-center px-5'>No photos in this product</div>
          )
        }
      </div>
      <label>Description:</label>
      <textarea placeholder='Description' value={description} onChange={e => setDescription((e).target.value)}></textarea>
      <label>Price (USD):</label>
      <input type='number' placeholder='Price' step={0.01} value={price} onChange={(e) => setPrice(e.target.value)} />

      {
        _id ? (
          <button className='btn btn-primary ' type='submit' onClick={(e) => saveProduct(e)}>Save</button>
        ) : (
          <button className='btn btn-primary ' type='submit' onClick={(e) => saveProduct(e)}>Submit</button>
        )
      }

    </form>
  )
}

export default ProductForm