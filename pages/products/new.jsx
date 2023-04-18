import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const NewProduct = () => {
  const router = useRouter();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [goToProducts, setGoToProducts] = useState(false);

  const createProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };
    await axios.post('/api/products', data);
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push('/products')
  }

  return (
    <Layout>
      <ProductForm />
    </Layout>
  )
}

export default NewProduct