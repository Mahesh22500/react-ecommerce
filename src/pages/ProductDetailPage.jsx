import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetail from '../features/product-list/components/ProductDetail'
const ProductDetailPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='flex items-center justify-center'>
        <div className=''>

      <ProductDetail></ProductDetail>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
