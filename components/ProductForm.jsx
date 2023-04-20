import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineDocumentArrowUp } from 'react-icons/hi2';
import { LeapFrog } from '@uiball/loaders';
import Link from 'next/link';
import { ReactSortable } from 'react-sortablejs';

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
  const [productProperties, setProductProperties] = useState(existingProperties || {})
  const fetchCategories = () => {
    axios.get('/api/categories').then(result => {
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

  return (
    <form className='w-full'>
      {
        !_id && (
          <Link href={'/products'} className='bg-sky-900 px-3 my-4 py-1 w-1/6 flex rounded-lg text-white hover:bg-sky-700 transition duration-200'>
            <HiOutlineChevronLeft size={25} className='mt-1' /> <span className='text-xl '>Back</span>
          </Link>
        )
      }
      <label>Product Name:</label>
      <input type='text' placeholder='Product name' value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className='my-4 py-2 px-5 rounded-lg mx-5 bg-sky-800 text-white hover:bg-sky-600 transition duration-300'>
        <option value="" >Uncategorized</option>
        {
          !!categories && categories.map(category => (
            <option value={category._id} key={category._id}>{category.name}</option>
          ))
        }
      </select>
      {propertiesToFill.length > 0 && propertiesToFill.map((p, index) => (
        <div key={index} className='my-4 py-2'>
          <label className='' >{p.name.charAt(0).toUpperCase() + p.name.slice(1)}: </label>
          <select value={productProperties[p.name]} onChange={(e) => setProductProp(p.name, e.target.value)} className='py-2 px-5 rounded-lg mx-5 bg-sky-800 text-white hover:bg-sky-600 transition duration-300'>
            {p.values && p.values.map(v => (
              <option value={v}>{v}</option>
            ))}
          </select>
        </div>
      ))}
      <br />
      <label>Images:</label>
      <div className='w-full my-2 flex flex-wrap gap-2'>
        <ReactSortable className='flex flex-wrap gap-2' list={images} setList={(e) => updateImagesOrder(e)}>
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