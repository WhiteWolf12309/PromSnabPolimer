
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addItemsCount, addTotalPriceCount, removeItemsCount, removeTotalPriceCount } from '../../store/basketSlice';

// import { addItem, removeItem } from '../../store/basketSlice'

import { addProductCount, addToProductBasket, removeProductBasket, removeProductCount } from '../../store/productsSlice';

import Minus from '../../assets/images/product-minus.svg';
import ProductItemPlus from '../Icons/ProductItemPlus/ProductItemPlus';

import './BusketItem.scss';

const ProductItem = ({ id, img, title, price, description, material, length, diameter, visualTypes, count }) => {

    const [productCount, setProductCount] = useState(count || 0)

    const dispatch = useDispatch()

    const addToBasket = () => {
        setProductCount(1)

        const productData = {
            id: id,
            title: title,
            price: price,
            material: material,
            length: length,
            diameter: diameter,
            count: productCount || 1
        }

        dispatch(addToProductBasket(productData))
        dispatch(addTotalPriceCount({ price: price }))
        dispatch(addItemsCount({ count: 1 }))
    }

    const changeProductCount = (e) => {
        setProductCount(e.target.value)

        dispatch(addProductCount({ id: id }))
        dispatch(addTotalPriceCount({ price: price }))
        dispatch(addItemsCount({ count: 1 }))
    }

    const removeFromBasket = () => {
        setProductCount(0)

        dispatch(removeProductBasket({ id: id }))
        dispatch(removeTotalPriceCount({ price: price }))
        dispatch(removeItemsCount({ count: 1 }))
    }

    const addProductItemCount = () => {
        setProductCount(prev => parseInt(prev, 10) + 1)

        dispatch(addProductCount({ id: id }))
        dispatch(addTotalPriceCount({ price: price }))
        dispatch(addItemsCount({ count: 1 }))

    }

    const removeProductItemCount = () => {
        setProductCount(prev => parseInt(prev, 10) - 1)

        dispatch(removeProductCount({ id: id }))
        dispatch(removeTotalPriceCount({ price: price }))
        dispatch(removeItemsCount({ count: 1 }))
    }

    return (
        <div className="product__item">
            <img className='product__img' src={img} alt="" />
            <div className="product__body">
                
                <div className="product__header">
                    <div className="header__title">{title}</div>
                    <div className="header__price">{price}₽</div>
                </div>
                

                <div className="product__description">{material && `Материал: ${material}`}. {length && `Длина: ${length}`}. {diameter && `Диаметр: ${diameter}`}.  {description && description}</div>
                <div className="product__footer">
                    { productCount > 0 ? (
                        <>
                            <div className="product__couner">
                                <div className="minus" onClick={removeProductItemCount}>
                                    <img src={Minus} alt="" />
                                </div>
                                <div className="count" value={productCount} >
                                    {productCount}
                                </div>
                                <div className="plus" onClick={addProductItemCount}>
                                    <ProductItemPlus className="plus-img" fill="#5B76FF" />
                                </div>
                            </div>

                            {/* <div className="product__remove" onClick={removeFromBasket}>
                                <ProductItemPlus className="plus-img remove-img" fill="#fff" />
                            </div> */}
                        </>
                    ) : (
                        <button onClick={addToBasket} className="add-to-card">Добавить в корзину</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
