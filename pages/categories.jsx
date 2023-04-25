import Layout from '@/components/Layout';
import Title from '@/components/Title';
import { DotSpinner, DotPulse } from '@uiball/loaders';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import Swal from 'sweetalert2';

const Categories = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false)
  const [disable, setDisable] = useState(false);
  const [parent, setParent] = useState('');
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([])
  const [showForm, setShowForm] = useState(false);

  const fetchCategories = async () => {
    await axios.get('api/categories').then(result => {
      setCategories(result.data);
    })
  }

  useEffect(() => {
    setLoading(true);
    fetchCategories();
    setLoading(false);
  }, [sending])

  const saveCategory = async (e) => {
    e.preventDefault();
    setDisable(true)
    setSending(true);
    console.log({ properties })
    const data = {
      name,
      parent,
      properties: properties.map(prop => ({ name: prop.name, values: prop.values.replace(/ /g, '').split(',') }))
    };
    if (editedCategory !== null) {
      data._id = editedCategory._id
      await axios.put('/api/categories', data);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    setEditedCategory(null);
    setProperties([])
    setSending(false);
    setDisable(false);
    setShowForm(false);
  }

  const editCategory = (category) => {
    setShowForm(true);
    setEditedCategory(category);
    setName(category.name);
    setParent(category.parent?._id || '');
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(', ')
      })) || [])
  }

  const deleteCategory = (category) => {
    console.log(category._id);
    Swal.fire({
      title: 'Delete Category',
      text: 'Do you want to delete category ' + category.name + '?',
      icon: 'warning',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      confirmButtonColor: '#33414B',
      cancelButtonColor: '#0369A1',
      background: '#F0F9FF'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setSending(true);
        setDisable(true);
        await axios.delete('/api/categories?id=' + category._id);
        setDisable(false);
        setSending(false);
      }
    })
  }

  const addProperty = (e) => {
    e.preventDefault();
    setProperties(prev => {
      return [...prev, { name: '', values: '' }]
    })
  }

  const handleForm = () => {
    setShowForm(true);
  }

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    })
  }

  const handlePropertyValuesChange = (index, property, newValues) => {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    })
  }

  const deleteSingleProperty = (indexToRemove) => {
    console.log(indexToRemove);
    setProperties(prev => {
      return [...prev].filter((p, index) => (
        index !== indexToRemove
      ))
    })
    console.log(properties);
  }

  const cancelEditCategory = (e) => {
    e.preventDefault()
    setEditedCategory(null);
    setName('');
    setParent('');
    setProperties([]);
    setShowForm(false);
  }
  return (
    <Layout>
      <Title>Categories</Title>
      {showForm ? (
        <form onSubmit={(e) => saveCategory(e)} className='w-full mb-4'>
          <label>
            {editedCategory ? 'Edit Category:'
              : 'Name:'
            }
          </label>
          <div className='flex gap-1 xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col'>
            <input type='text' placeholder='Category name' value={name} onChange={(e) => setName(e.target.value)} required />
            <select className='my-2 py-1 rounded-lg border-2 border-slate-400' value={parent} onChange={(e) => setParent(e.target.value)}>
              <option value="">No parent category</option>
              {!!categories && categories.map(category => (
                <option value={category._id} key={category._id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="my-4">
            <div className="w-full flex justify-between gap-2">
              <label>Properties:</label>
              <button onClick={(e) => addProperty(e)} className='bg-sky-700 hover:bg-sky-500 transition duration-300 text-white px-3 py-2 rounded-lg'>Add new property</button>
            </div>
            <div className=' mt-4 px-1 py-4'>
              {!!properties && properties.map((property, index) => (
                <div key={index} className='flex gap-1 my-2 xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col justify-center bg-sky-100 border border-slate-200 rounded-xl py-2 px-1'>
                  <div className='text-2xl text-center'>{index + 1}</div>
                  <div className='flex'>
                    <input type='text' value={property.name} onChange={(ev) => handlePropertyNameChange(index, property, ev.target.value)} className='w-1/2 my-0' placeholder='Name' />
                    <input type='text' value={property.values} onChange={(ev) => handlePropertyValuesChange(index, property, ev.target.value)} className='w-1/2 my-0' placeholder='Value' />
                  </div>
                  <button onClick={() => deleteSingleProperty(index)} className='bg-slate-500 hover:bg-slate-400 transition duration-200 text-white px-2 py-1 rounded-lg'>Remove</button>
                </div>
              ))}
              {properties.length === 0 && (
                <div className='text-center text-xl text-slate-900/50'>
                  {editedCategory !== null ? 'No Existed Properties' : 'No Properties'}
                </div>
              )
              }
            </div>
          </div>

          <div className='w-full flex gap-4 justify-center'>
            <button onClick={(e) => cancelEditCategory(e)} className='text-white bg-slate-600 my-2 px-5 py-2 rounded-lg hover:bg-slate-500 hover:scale-105 hover:-translate-y-1 transition duration-200 '>
              Cancel
            </button>
            <button type='submit' className='text-white bg-sky-700 my-2 px-5 py-2 rounded-lg hover:bg-sky-500 hover:scale-105 hover:-translate-y-1 transition duration-200 disabled:opacity-75' disabled={disable}>
              {sending ? (
                <DotPulse size={20} color='#0C4A6E' className='text-center' />
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => handleForm()} className='text-white bg-green-700 my-2 py-2 xl:w-1/6 lg:w-1/6 md:w-2/6 sm:w-2/3 rounded-lg hover:bg-green-500 hover:scale-105 hover:-translate-y-1 transition duration-200 disabled:opacity-75 '>New Category</button>
      )
      }
      {loading && (
        <div className='w-full h-full grid justify-center content-center'>
          <DotSpinner size={60} color='#0C4A6E' />
        </div>
      )}
      {!(showForm || loading) && (
        <div className='w-full h-full overflow-y-auto my-2 '>
          <table className='w-full'>
            <thead className='bg-sky-100'>
              <tr className='font-semibold text-xl'>
                <td className='py-5'>Category Name</td>
                <td className='py-5'>Parent Category</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {!!categories && categories.map(category => (
                <tr key={category._id} className='border-t'>
                  <td className='py-4'>{category.name}</td>
                  <td className='py-4'>{category?.parent?.name}</td>
                  <td className='flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col py-2'>
                    <button onClick={() => editCategory(category)} className='xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full py-1  m-1 text-white bg-sky-700 rounded-lg hover:bg-sky-500 flex justify-center'><HiOutlinePencilSquare size={22} />Edit</button>
                    <button onClick={() => deleteCategory(category)} className='xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full w-full py-1  m-1 text-white bg-red-700 rounded-lg hover:bg-red-500 flex justify-center'><HiOutlineTrash size={22} />Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}

export default Categories