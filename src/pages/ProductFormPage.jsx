import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductForm from './ProductForm'

const ProductFormPage = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className = "mx-10 p-10 bg-gray-200 border-2  ">
        <ProductForm></ProductForm>
        </div>
    </div>
  )
}

export default ProductFormPage