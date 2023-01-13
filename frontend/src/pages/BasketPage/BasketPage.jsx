
import React from 'react';
import OrderCalculator from '../../components/OrderCalculator/OrderCalculator';

import { useSelector } from 'react-redux';

import './BasketPage.scss'


const BasketPage = () => {

    const basketItems = useSelector(state => state.products.items)


    return (
        <div className='basket-page'>
            <div className="container">
                <div className="basket-page__inner">
                    <OrderCalculator basketItems={basketItems} />
                </div>
            </div>
        </div>
    );
}

export default BasketPage;
