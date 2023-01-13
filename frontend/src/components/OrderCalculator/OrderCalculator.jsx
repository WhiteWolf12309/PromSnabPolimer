
import { Checkbox } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { endpoints } from '../../api/index';
import ProductItemImgExample from '../../assets/images/product-item-example.jpg';
import BusketItem from '../../components/BusketItem/BusketItem';
import { deleteListItem } from '../../helpers/deleteListItem';
import { addItem, addWithOrder, changeContactData, changeWishes, removeAllItems, removeItem, removeWithOrder } from '../../store/basketSlice';
import { removeAllProductItemsFromStore } from '../../store/productsSlice';
import ListMenu from '../ListMenu/ListMenu';
import SectionTitle from '../SectionTitle/SectionTitle';

import CalculatorPlus from '../../assets/images/calculator-plus.svg';
import CalculatorRemove from '../../assets/images/calculator-remove.svg';
import CalculatorEdit from '../../assets/images/productItem-edit.svg';

import './OrderCalculator.scss';


const ProductItem = ({ id, isChanging, productItems, setProductItems, title, diameter, diameterType , length, count, weight, price  }) => {

    const getProductItemData = async () => {
        await axios.get(endpoints.CATALOG_FILTER_DATA)
        .then(res => {
            setDiameters(res.data[0]['order-diameters'])
            setCategories(res.data[0]['order-categories'])
        })
    }

    useEffect(() => {
        getProductItemData()
    }, [])

    const [diameters, setDiameters] = useState([])
    const [categories, setCategories] = useState([])

    const [localIsChanging, setLocalIsChanging] = useState(isChanging)
    const [localPrice, setLocalPrice] = useState(price)
    const [localTitle, setLocalTitle] = useState(title)
    const [localTypesOfDiameter, setLocalTypesOfDiameter] = useState(diameterType)
    const [localDiameter, setLocalDiameter] = useState(diameter)
    const [localLength, setLocalLength] = useState(length)
    const [localCount, setLocalCount] = useState(count)
    const [localWeight, setLocalWeight] = useState(weight)

    const dispatch = useDispatch()
    const ProductItems = useSelector(state => state.basket.items)


    const calculateCardPrice = () => {
        setLocalPrice((localDiameter * (localLength / 10) * localCount).toFixed(2))
    }

    useEffect(() => {
        calculateCardPrice()
    }, [localDiameter, localLength, localCount])
 
    const removeProductItem = (id, productItems, setProductItems) => {
        deleteListItem(id, productItems, setProductItems)

        dispatch(removeItem({id, productItems, setProductItems}))
        console.log(ProductItems)
    }


    const addProductItem = () => {
        setLocalIsChanging(false)

        const productData = {
            id: id,
            title: localTitle,
            diameter: localDiameter,
            length: localLength,
            count: localCount,
            price: localPrice,
            weight: localWeight
        }

        return dispatch(addItem(productData))
    }

    const setProductItemState = () => {
        setLocalIsChanging(true)
    }

    const changeLocalLength = (data) => setLocalLength(data)
    const changeLocalCount = (data) => setLocalCount(data)

    const resetAllData = () => {
        setLocalTitle("Трубы напорные для водоснабжения")
        setLocalTypesOfDiameter("см.")
        setLocalDiameter("32")
        setLocalLength(length)
        setLocalCount(count)
    }

    return (
        <>
            {localIsChanging ? (
                <motion.div
                className="product-card changing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                    <div className="product-card__action-btns">
                        <div className="remove__btn" onClick={() => removeProductItem(id, productItems, setProductItems)}>
                            <img className='remove__img' src={CalculatorRemove} alt="" />
                        </div>
                    </div>
                    <div className="product-card__title">
                        <ListMenu defaultState={localTitle} ListOfStates={categories} setDataGrab={setLocalTitle} />
                    </div>
                    <div className="product-card__inner">
                        <div className="product-card__constructor">
                            <div className="constructor__item">
                                <div className="text">Диаметр:</div>
                                <ListMenu defaultState={localDiameter} ListOfStates={diameters} setDataGrab={setLocalDiameter}  />
                                <div className="text ml-5">мм</div>
                            </div>
                            <div className="constructor__item">
                                <div className="text">Длина:</div>
                                <input type="number" value={localLength} onChange={(e) => changeLocalLength(e.target.value)} />
                                <div className="text ml-5">м</div>
                            </div>
                            <div className="constructor__item">
                                <div className="text">Количество:</div>
                                <input type="number" value={localCount} onChange={(e) => changeLocalCount(e.target.value)}  />
                            </div>
                        </div>
                        <div className="product-card__info">
                            <div className="info__item">
                                <span className="text">Вес:</span>
                                <span className="count__product">{weight}</span>
                                <span className="text ml-5">гр.</span>
                            </div>
                            <div className="info__item">
                                <span className="text">Сумма:</span>
                                <span className="total-sum">{localPrice}</span>
                                <span className="text ml-5">₽</span>
                            </div>
                        </div>
                    </div>
                    <div className="product-card__buttons">
                        <div
                        className="btn__reset" 
                        onClick={resetAllData}
                        >Сбросить</div>

                        <div className="btn__save" onClick={addProductItem}>Добавить</div>
                    </div>
                </motion.div>    
            ) : (
                <motion.div 
                className="product-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                    <div className="product-card__action-btns">
                        <div className="remove__btn" onClick={() => removeProductItem(id, productItems, setProductItems)}>
                            <img className='remove__img' src={CalculatorRemove} alt="" />
                        </div>
                        <div className="edit__btn" onClick={setProductItemState}>
                            <img className='edit__img' src={CalculatorEdit} alt="" />
                        </div>
                    </div>
                    
                    <div className="product-card__saved-title">
                        <div className="title__data">{localTitle}</div>
                    </div>

                    <div className="product-card__saved-inner">
                        <div className="inner__item">
                            <div className="item__text">Диаметр:</div>
                            <div className="item__data">{localDiameter}</div>
                            <div className="item__unit ml-5">см.</div>
                        </div>
                        <div className="inner__item">
                            <div className="item__text">Длина:</div>
                            <div className="item__data">{localLength}</div>
                            <div className="item__unit ml-5">м.</div>
                        </div>
                        <div className="inner__item">
                            <div className="item__text">Количество:</div>
                            <div className="item__data">{localCount}</div>
                            <div className="item__unit ml-5">шт.</div>
                        </div>
                        <div className="inner__item">
                            <div className="item__text">Вес:</div>
                            <div className="item__data">{weight}</div>
                            <div className="item__unit ml-5">гр.</div>
                        </div>
                    </div>
                    <div className="product-card__saved-total">
                        <div className="total-sum">
                            <div className="total-sum__text">Сумма:</div>
                            <div className="total-sum__data">{localPrice}</div>
                            <div className="total-sum__text ml-5">₽</div>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    )
    
}


const OrderCalculator = ({ basketItems }) => {

    const ProductItemsTotalPrice = useSelector(state => state.basket.itemsTotalPrice)
    const isWithOrderStore = useSelector(state => state.basket.isWithOrder)
    const ProductItemsStore = useSelector(state => state.basket.items)
    const BasketItemsStore = useSelector(state => state.products.items)

    const contactDataStore = useSelector(state => state.basket.ContactData)
    const wishesStore = useSelector(state => state.basket.wishes)

    const dispatch = useDispatch()

    const changeIsWithOrderState = () => {
        isWithOrderStore === true ? dispatch(addWithOrder({status: isWithOrderStore})) : dispatch(removeWithOrder({status: isWithOrderStore}))
    }
    
    const [productItems, setProductItems] = useState(ProductItemsStore)
    const [contactData, setContactData] = useState(contactDataStore)
    const [wishes, setWishes] = useState(wishesStore)


    const changeContactData = (data) => {
        setContactData(data)
    }

    const changeWishes = (data) => {
        setWishes(data)
    }

    const removeAllProductItems = () => {
        setProductItems([])
        dispatch(removeAllItems({
            status: true,
            isWithOrder: isWithOrderStore,
        }))
        dispatch(removeAllProductItemsFromStore({ status: true }))
    }
    
    const addNewProductItem = () => {
        setProductItems([...productItems, {
            id: uuidv4(),
            title: `Трубы напорные для водоснабжения`,
            diameter: "32",
            diameterType: "см",
            length: "1",
            count: "1",
            weight: 0.325,
            price: 150,
            isChanging: true,
        }])
    }

    const basketIsClear = () => toast.error("Ваша корзина пуста!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const ContactDataClear = () => toast.error("Вы не указали контактные данные", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const sendAllData = async () => {

        if (contactData) {
            await axios.post(endpoints.BASKET_DATA, {
                totalPrice: ProductItemsTotalPrice,
                isWithOrder: isWithOrderStore,
                contactData: contactData,
                wishes: wishes,
                items: ProductItemsStore,
                basketItems: BasketItemsStore
            })
            .then(res => {
                if (res.status >= 200) {
                    toast.success(`Ваш заказ принят и ожидает подтверждения. Номер вашего заказа: ${res.data.orderUid}`, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    removeAllProductItems()
                    setContactData("")
                    setWishes("")
                }
            })
            .catch(err => {
                toast.error("Что-то пошло не так, попробуйте заказать позже", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
        } else {
            ContactDataClear()
        }
        
    }

    

        
    return (
        <div className='order-calculator' id='order-calculator'>
            <div className="container">
                <SectionTitle title={"Калькулятор заказа"} />

                <div className="order-calculator__inner">

                    <div className="inner__products">
                        {/* TODO: MUST BE A COMPONENT */}

                        {productItems.map(item => {
                            return <ProductItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            diameter={item.diameter}
                            diameterType={item.diameterType}
                            count={item.count}
                            weight={item.weight}
                            price={item.price}
                            length={item.length}
                            isChanging={item.isChanging}
                            setProductItems={setProductItems}
                            productItems={productItems}
                            />
                        })}

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="products__btn-add" onClick={addNewProductItem}>
                            <div className="text">Добавить товар в корзину</div>
                            <img className='img' src={CalculatorPlus} alt="Добавить" />
                        </motion.div>
                    </div>

                    <div className="inner__footer">
                        <div className="busket__subtitle">

                            { basketItems && (
                                <div className="busket__product__items">
                                    { basketItems.map(item => {
                                        return <BusketItem 
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        description={item.description}
                                        price={item.price}
                                        diameter={item.diameter}
                                        length={item.length}
                                        material={item.material}
                                        count={item.count}
                                        visualTypes={{ column: true }}
                                        img={ProductItemImgExample}
                                        />
                                    }) }
                                </div>
                            ) }
                            

                            <div className="busket__subtitle__info">
                                <div className="settings-item">
                                    <label>
                                        <div className="settings-item__check-box">
                                            <Checkbox defaultChecked checked={isWithOrderStore} onChange={changeIsWithOrderState} color="warning" />
                                        </div>
                                        <div className="settings-item__text">Доставка до дома (350₽)</div>
                                    </label>
                                </div>
                                <div className="info__inner">
                                    <input value={contactData} onChange={e => changeContactData(e.target.value)} className="info__input" placeholder='Укажите ваши контактные данные (email или номер телефона)' />
                                    <input value={wishes} onChange={e => changeWishes(e.target.value)} className="info__textarea" placeholder='Здесь вы можете указать пожелания касательно доставки или подготовки заказа (необязательно)' />
                                    <div className="info__total-price">Сумма заказа: <span className='products-price'>{ProductItemsTotalPrice} ₽</span></div>
                                </div>
                            </div>
                            <div className="busket__subtitle__buttons">
                                <div className="button-back">
                                    <div className="button-back-title" onClick={removeAllProductItems}>Сбросить всё</div>
                                </div>
                                { location.pathname === '/basket' ? (
                                    <div className="button-payment">
                                        <div className="button-payment-title" onClick={BasketItemsStore.length || ProductItemsStore.length ? sendAllData : basketIsClear}>Заказать сейчас</div>
                                    </div>
                                ) : (
                                    <div className="button-payment">
                                        <Link to="/basket" className="button-payment-title" onClick={BasketItemsStore.length || ProductItemsStore.length || basketIsClear}>Перейти в корзину</Link>
                                    </div>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default OrderCalculator;
