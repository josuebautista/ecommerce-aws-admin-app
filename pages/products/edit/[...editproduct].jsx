import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import ProductForm from '@/components/ProductForm';
import axios from 'axios';


const EditProductPage = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { editproduct } = router.query;
  useEffect(() => {
    if (editproduct === null) {
      return;
    }
    axios.get('/api/products?id=' + editproduct).then(response => {
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