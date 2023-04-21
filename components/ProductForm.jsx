import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineDocumentArrowUp } from 'react-icons/hi2';
import { LeapFrog } from '@uiball/loaders';
import Link from 'next/link';
import { ReactSortable } from 'react-sortablejs';
import Title from './Title';

const ProductForm = ({ _id, title: existingTitle, description: existingDescription, price: existingPrice, images: existingImages, category: existingCategory, properties: existingProperties }) => {
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [upload, setUpload] = useState(false);
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(existingCategory || '');
  const [productProperties, setProductProperties] = useState(existingProperties || {});

  const fetchCategories = async () => {
    await axios.get('/api/categories').then(result => {
      setCategories(result.data);
    })
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price, images, category, properties: productProperties };
    if (_id) {
      await axios.put('/api/products', { ...data, _id });
    } else {
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
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

  const updateImagesOrder = (images) => {
    setImages(images);
  }

  const propertiesToFill = []
  if (categories && category) {
    let selectedCategoryInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...selectedCategoryInfo.properties);
    while (selectedCategoryInfo?.parent?._id) {
      const parentCategory = categories.find(({ _id }) => _id === selectedCategoryInfo?.parent?._id);
      propertiesToFill.push(...parentCategory.properties);
      selectedCategoryInfo = parentCategory;
    }
  }
  const setProductProp = (name, value) => {
    setProductProperties(prev => {
      const newProductProps = { ...prev };
      newProductProps[name] = value;
      return newProductProps;
    })
  }

  const cancelForm = (e) => {
    e.preventDefault();
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push('/products')
  }

  return (
    <form className='w-full'>
      <Title>Products</Title>
      <label>Product Name:</label>
      <input type='text' placeholder='Product name' value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className='flex my-4'>
        <label >Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className='py-2 w-full px-10 rounded-lg ml-5 bg-sky-800 text-white hover:bg-sky-600 transition duration-300'>
          <option value="">Uncategorized</option>
          {!!categories && categories.map(category => (
            <option value={category._id} key={category._id}>{category.name}</option>
          ))}
        </select>
      </div>

      {propertiesToFill.length > 0 && propertiesToFill.map((p, index) => (
        <div key={index} className='my-4 flex'>
          <label className='' >{p.name.charAt(0).toUpperCase() + p.name.slice(1)}: </label>
          <select value={productProperties[p.name]} onChange={(e) => setProductProp(p.name, e.target.value)} className='py-2 px-10 w-full rounded-lg ml-5 bg-sky-800 text-white hover:bg-sky-600 transition duration-300'>
            {p.values && p.values.map(v => (
              <option value={v}>{v}</option>
            ))}
          </select>
        </div>
      ))}
      <br />
      <label>Images:</label>
      <div className='w-full my-2 flex flex-grow gap-2'>
        <ReactSortable className='flex flex-grow gap-2' list={images} setList={(e) => updateImagesOrder(e)}>
          {
            !!images?.length && images.map((link, index) => (
              <div key={index} className='h-32 border border-sky-900 rounded-xl overflow-hidden'>
                <img src={link} className='rounded-xl object-center h-32 object-cover' alt={link} />
              </div>
            ))
          }
        </ReactSortable>
        <div className='w-32 h-32 border border-sky-900 rounded-xl bg-slate-100'>
          <label>
            <div className='w-full h-full grid justify-center items-center hover:scale-105 hover:-translate-y-1 hover:text-black/50 duration-200'>
              <HiOutlineDocumentArrowUp size={45} />
              <input type='file' className='hidden' onChange={(e) => uploadImages(e)} />
            </div>
          </label>
        </div>
        {
          upload && (
            <div className='w-32 h-32 border bg-slate-200 border-sky-900 rounded-xl mx-2 grid content-center justify-center'>
              <LeapFrog size={45} color='#0C4A6E' />
            </div>
          )
        }
        {
          !!images?.length || !upload && (
            <div className='py-2 h-32 grid content-center px-5 text-2xl text-sky-900/50'>No photos in this product</div>
          )
        }
      </div>
      <label>Description:</label>
      <textarea placeholder='Description' value={description} onChange={e => setDescription((e).target.value)}></textarea>
      <label>Price (USD):</label>
      <input type='number' placeholder='Price' step={0.01} value={price} onChange={(e) => setPrice(e.target.value)} />

      <div className='w-full flex justify-center gap-4'>
        <button type='button' onClick={(e) => cancelForm(e)} className='btn btn-secondary xl:w-1/12 lg:w-2/12 md:w-1/6 sm:w-1/3'>Cancel</button>
        {
          _id ? (
            <button className='btn btn-primary xl:w-1/12 lg:w-2/12 md:w-1/6 sm:w-1/3' type='submit' onClick={(e) => saveProduct(e)}>Save</button>
          ) : (
            <button className='btn btn-primary xl:w-1/12 lg:w-2/12 md:w-1/6 sm:w-1/3' type='submit' onClick={(e) => saveProduct(e)}>Submit</button>
          )
        }
      </div>
    </form>
  )
}

export default ProductForm