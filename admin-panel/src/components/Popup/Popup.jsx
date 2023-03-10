
import React, { useState } from 'react';
import axios from 'axios';
import { settings } from '../../helpers/toastify-configurations.js'
import { toast } from 'react-toastify';

import getCurrentDate from '../../helpers/getCurrentDate';
import CheckMark from '../../assets/images/check-mark.svg'

import './Popup.scss'

const Popup = ({ popup, setPopup }) => {

    const [addressIsAdditing, setAddressIsAdditing] = useState(false)
    const [contactIsAdditing, setContactIsAdditing] = useState(false)
    const [priceIsAdditing, setPriceIsAdditing] = useState(false)

    const [anotherData, setAnotherData] = useState({
        address: '',
        contactData: '',
        price: '',
        currentDate: getCurrentDate()
    })

    const [products, setProducts] = useState([])
    const [currentInputValues, setCurrentInputValues] = useState({
        title: '',
        diameter: '',
        length: '',
        count: ''
    })
    const [isAdditing, setIsAdditing] = useState(false)

    const addToProducts = () => {
        setProducts([...products, {
            id: products.length + 1,
            title: currentInputValues.title,
            diameter: currentInputValues.diameter,
            length: currentInputValues.length,
            count: currentInputValues.count
        }])
        setIsAdditing(false)
        setCurrentInputValues({
            title: '',
            diameter: '',
            length: '',
            count: ''
        })
    }

    const disablePopup = () => setPopup(false)
    const enablePopup = (e) => e.stopPropagation()
    
    const clearAllData = () => {
        setAddressIsAdditing(false)
        setContactIsAdditing(false)
        setPriceIsAdditing(false)

        setAnotherData({
            address: '',
            contactData: '',
            price: '',
            currentDate: getCurrentDate()
        })

        setCurrentInputValues({
            title: '',
            diameter: '',
            length: '',
            count: ''
        })

        setProducts([])
    }

    const sendData = async () => {

        if (anotherData.address !== '' && anotherData.contactData !== '' && anotherData.price !== '' && products.length > 0) {
            const data = {
                items: products,
                totalPrice: anotherData.price,
                contactData: anotherData.contactData,
                address: anotherData.address,
                basketItems: null
            }

            await axios.post("http://localhost:3001/products", data)
            .then((res) => {
                toast.success("?????????? ?????????????? ????????????????", settings)
            })
            .catch((err) => {
                toast.success("??????-???? ?????????? ???? ??????...", settings)
            })
            setPopup(false)
            clearAllData()
        } else {
            toast.error("???????????????? ???????????????????????? ????????!", settings)
            // TODO: ?????????????? ?????????????????????? ?? ??????, ?????? ???? ?????? ???????? ??????????????????
        }

        
    }


    return (
        <div className='popup' style={{ display: (popup ? "flex" : "none") }} onClick={disablePopup}>
            <div className="popup__inner" onClick={(e) => enablePopup(e)}>
                <div className="popup__inner__body">
                    <div className="body__item-titles">
                        <div className="item__body">
                            <div className="item__body-title">????????????</div>
                            <div className="item__body-inner">
                                <div className="upper__table">
                                    <div className="upper__table-title">????????????????????????</div>
                                    <div className="upper__table-diameter">??????????????</div>
                                    <div className="upper__table-length">??????????</div>
                                    <div className="upper__table-count">????????????????????</div>
                                    {isAdditing && <div className="upper__table-add"></div>}
                                </div>

                                {products && products.map(item => (
                                    <div className='item' key={item.id}>
                                        <div className="item__title">{item.title}</div>
                                        <div className="item__diameter">{item.diameter}</div>
                                        <div className="item__length">{item.length}</div>
                                        <div className="item__count">{item.count}</div>
                                    </div>
                                ))}
                                {isAdditing && (
                                    <div className='inputs'>
                                        <input value={currentInputValues.title} onChange={(e) => setCurrentInputValues({...currentInputValues, title: e.target.value})} type="text" className='input title' placeholder='???????????????? ????????????' />
                                        <input value={currentInputValues.diameter} onChange={(e) => setCurrentInputValues({...currentInputValues, diameter: e.target.value})} type="number" className='input diameter' placeholder='??????????????' />
                                        <input value={currentInputValues.length} onChange={(e) => setCurrentInputValues({...currentInputValues, length: e.target.value})} type="number" className='input length' placeholder='??????????' />
                                        <input value={currentInputValues.count} onChange={(e) => setCurrentInputValues({...currentInputValues, count: e.target.value})} type="number" className='input count' placeholder='????????????????????' />
                                        <div className="input-save" onClick={addToProducts}>
                                            <img src={CheckMark} alt="" />
                                        </div>
                                    </div>
                                )}
                                <div className="add-title" onClick={() => setIsAdditing(true)}>????????????????</div>
                            </div>
                        </div> 


                        <div className="body__items">
                            <div className="item__body">
                                <div className="item__body-title mt-20">??????????</div>
                                <div className="item__body-inner d-flex">
                                    {addressIsAdditing ? (
                                        <div className="inner-data">{anotherData.address && anotherData.address}</div>
                                    ) : (
                                        <>
                                            <input value={anotherData.address} onChange={e => setAnotherData({...anotherData, address: e.target.value})} type="text" className='inner-input' placeholder='?????????????? ??????????' style={{ width: '90%' }} />
                                            <div className="input-save" onClick={() => (anotherData.address !== '' && setAddressIsAdditing(true))}>    
                                                <img src={CheckMark} alt="" />
                                            </div>
                                        </>
                                        
                                    )}
                                </div>
                            </div>

                            <div className="item__body">
                                <div className="item__body-title mt-20">???????????????????? ????????????</div>
                                <div className="item__body-inner d-flex">
                                    {contactIsAdditing ? (
                                        <div className="inner-data">{anotherData.contactData && anotherData.contactData}</div>
                                    ) : (
                                        <>
                                            <input value={anotherData.contactData} onChange={e => setAnotherData({...anotherData, contactData: e.target.value})} type="text" className='inner-input' placeholder='?????????????? ???????????????????? ????????????' style={{ width: '90%' }} />
                                            <div className="input-save" onClick={() => (anotherData.contactData !== '' && setContactIsAdditing(true))}>    
                                                <img src={CheckMark} alt="" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="item__body">
                                <div className="item__body-title mt-20">??????????</div>
                                <div className="item__body-inner d-flex">
                                    {priceIsAdditing ? (
                                        <div className="inner-data">{anotherData.price && anotherData.price}</div>
                                    ) : (
                                        <>
                                            <input value={anotherData.price} onChange={e => setAnotherData({...anotherData, price: e.target.value})} type="number" className='inner-input' placeholder='?????????????? ??????????' style={{ width: '90%' }} />
                                            <div className="input-save" onClick={() => (anotherData.price !== '' && setPriceIsAdditing(true))}>    
                                                <img src={CheckMark} alt="" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="item__body">
                                <div className="item__body-title mt-20">????????</div>
                                <div className="item__body-inner d-flex">
                                    <div className="inner-data">{anotherData.currentDate && anotherData.currentDate}</div>
                                </div>
                            </div>
                        </div>

                        <div className="popup__buttons">
                            <button className="popup__buttons-accept" onClick={sendData}>???????????????? ??????????</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;
