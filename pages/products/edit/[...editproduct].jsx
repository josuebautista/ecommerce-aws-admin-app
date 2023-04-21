import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import Link from 'next/link';
import { HiOutlineChevronLeft } from "react-icons/hi2";


const EditProductPage = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { editproduct } = router.query;

  const [id, setId] = useState(editproduct[0] || null)
  useEffect(() => {
    if (id === null) {
      return;
    }
     axios.get('/api/products?id=' + id).then(response => {
      //console.log(response.data)
      setProductInfo(response.data)
    });
  }, [editproduct]);

  return (
    <Layout>
      {
        productInfo !== null && (
          
            <ProductForm {...productInfo} />
          
        )
      }
    </Layout>
  )
}

export default EditProductPage;