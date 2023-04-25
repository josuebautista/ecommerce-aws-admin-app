import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import axios from 'axios';
import { DotSpinner } from '@uiball/loaders'

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false)

  const getOrders = async () => {
    setLoading(true);
    await axios.get('/api/orders').then(response => {
      setOrders(response.data);
    })
    console.log(orders);
    setLoading(false);
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <Layout>
      <Title>Orders</Title>
      <div className='w-full h-full my-5 overflow-x-auto'>
        {loading ? (
          <div className='grid place-content-center h-full'>
            <DotSpinner size={60} color='#0C4A6E' />
          </div>
        ) : (
          <table className='w-full '>
            <thead className='bg-sky-100'>
              <tr className='font-semibold text-xl'>
                <td className='py-5 text-center'>DATE</td>
                <td className='py-5 text-center'>PAID</td>
                <td className='py-5'>RECIPIENT</td>
                <td className='py-5'>PRODUCTS</td>
              </tr>
            </thead>
            <tbody>
              {orders !== null && orders.map(order => (
                <tr key={order._id} className='border-t'>
                  <td className='text-center'>
                    <div>
                      {order.createdAt.replace('T', ' ').replace('-', '/').replace('-', '/').split('.')[0].split(' ')[0]}
                    </div>
                    <div>
                      {order.createdAt.replace('T', ' ').split('.')[0].split(' ')[1]}
                    </div>
                  </td>
                  <td>
                    <div className='px-10 text-center font-bold'>
                      {order.paid ? (
                        <p className='text-green-500'>Yes</p>
                      ) : (
                        <p className='text-red-500'>No</p>
                      )}
                    </div>
                  </td>
                  <td className='flex flex-col'>
                    <div>
                      {order.name}
                    </div>
                    <div>
                      {order.email}
                    </div>
                    <div>
                      {order.streetAddress}, {order.city}, {order.country}
                    </div>
                    <div>
                      {order.postalCode}
                    </div>
                  </td>
                  <td className=''>
                    {order.line_items.map((item, index) => (
                      <div key={index}>
                        <span className='font-semibold'>{item.price_data.product_data.name}</span> x {item.quantity}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}

export default Orders;