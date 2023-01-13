
import React from 'react';
import MainProductsSection from '../../components/MainProductsSection/MainProductsSection';

import './ProductsPage.scss'

const ProductsPage = () => {
    return (
        <div className='products-page'>
            <div className="products-page__inner">
                <MainProductsSection />
            </div>
        </div>
    );
}

export default ProductsPage;
