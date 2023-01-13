
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { settings } from '../../helpers/toastify-configurations.js'

import './TableItem.scss'



export const TableItemPopup = ({ id, title, price, contactData, date, status, setShowPopup, showPopup, basketItems, address }) => {

    const [localStatus, setLocalStatus] = useState(status)

    const disablePopupHandler = () => setShowPopup(false)
    const showPopupHandler = (e) => {
        e.stopPropagation()
    }

    const completeOrder = async () => {
        sendChangedOrder('completed')
        toast.success("Заказ успешно выполнен", settings)
    }

    const acceptOrder = async () => {
        sendChangedOrder('in-process')
        toast.success("Заказ успешно принят, и находится в статусе выполения", settings)
    }

    const rejectOrder = async () => {
        sendChangedOrder('rejected')
        toast.success("Заказ успешно отклонён", settings)
    }

    const sendChangedOrder = async ( status ) => {
        await axios.put("http://localhost:3001/products", {
            id,
            status: status
        })
        .then(res => {
            setLocalStatus(res.data.status)
        })
        setShowPopup(false)
    }

    const popupSettings = {
        display: showPopup ? 'flex' : 'none'
    }


    return (
        <div className="popup" style={popupSettings} onClick={disablePopupHandler}>
            <div className="popup__item" onClick={showPopupHandler}>
                <div className="popup__body">
                    <div className="popup__body-upper">
                        <div className="upper__item">
                            <div className="upper__item-title">Содержимое заказа</div>
                            <div className="upper__item-body titles">
                                <div className="upper__table">
                                    <div className="upper__table-title">Наименование</div>
                                    <div className="upper__table-diameter">Диаметр</div>
                                    <div className="upper__table-length">Длина</div>
                                    <div className="upper__table-count">Количество</div>
                                </div>
                                <div className="table__body">
                                    {title && <div className="table__body-line">На складе нет</div>}
                                    {title && title.map(item => 
                                        (
                                            <div className='table__body__inner'>
                                                <div className='table__body__inner-title'>{item.title}</div>
                                                <div className='table__body__inner-diameter'>{item.diameter}</div>
                                                <div className='table__body__inner-length'>{item.length}</div>
                                                <div className='table__body__inner-count'>{item.count}</div>
                                            </div>
                                        )
                                    )}

                                    {basketItems && <div className="table__body-line">Есть на складе</div>}
                                    {basketItems && basketItems.map(item => (
                                        <>
                                            <div className='table__body__inner'>
                                                <div className='table__body__inner-title'>{item.title}</div>
                                                <div className='table__body__inner-diameter'>{item.diameter}</div>
                                                <div className='table__body__inner-length'>{item.length}</div>
                                                <div className='table__body__inner-count'>{item.count}</div>
                                            </div>
                                        </>
                                    ))}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="popup__body-lower">
                        <div className="lower__item">
                            <div className="lower__item-title">Адрес</div>
                            <div className="lower__item-body">{address}</div>
                        </div>
                        <div className="lower__item">
                            <div className="lower__item-title">Контактные данные</div>
                            <div className="lower__item-body">{contactData}</div>
                        </div>
                        <div className="lower__item">
                            <div className="lower__item-title">Дата заказа</div>
                            <div className="lower__item-body">{date}</div>
                        </div>
                        <div className="lower__item mt-20">
                            <div className="lower__item-title">Сумма заказа (₽)</div>
                            <div className="lower__item-body price">{price}</div>
                        </div>
                    </div>
                </div>
                <div className="popup__buttons">
                    {localStatus === 'new-order' || localStatus === 'in-process' ? (
                        <button className="popup__buttons-reject" onClick={rejectOrder}>Отклонить заказ</button>
                    ) : (<></>)}
                    {localStatus === 'new-order' && (
                        <button className="popup__buttons-accept" onClick={acceptOrder}>Подтвердить заказ</button>
                    )}
                    {localStatus === 'in-process' && (
                        <button className="popup__buttons-accept" onClick={completeOrder}>Завершить заказ</button>
                    )}
                </div>
            </div>
        </div>
    )
}



const TableItem = ({ id, title, price, contactData, date, status, isWithOrder, basketItems, address }) => {

    const [currentStatus, setCurrentStatus] = useState(status)
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        getCurrentProductStatus()
    }, [])

    const getCurrentProductStatus = () => {
        if (status === 'new-order') {
            setCurrentStatus('Ожидает подтверждения')
        } else if (status === 'in-process') {
            setCurrentStatus("В процессе")
        } else if (status === 'completed') {
            setCurrentStatus("Заказ выполнен")
        }
    }

    const showPopupHandler = () => {
        setShowPopup(true)
    }

    return (
        <>
            <div className="body__item" onClick={() => showPopupHandler()}>
                <div className="body__item-id">{id}</div>
                <div className="body__item-body">{title && title.map(item => <div>{item.title}</div>)}</div>
                <div className="body__item-price">{price}</div>
                <div className="body__item-contact-data">{contactData}</div>
                <div className="body__item-place">{address}</div>
                <div className="body__item-date">{date}</div>
                <div className="body__item-order">{isWithOrder ? "До дома" : "Нет"}</div>
                {status === 'new-order' &&<div className="body__item-status new-order">{currentStatus}</div>}
                {status === 'in-process' &&<div className="body__item-status in-process">{currentStatus}</div>}
                {status === 'completed' &&<div className="body__item-status completed">{currentStatus}</div>}
            </div>
            <TableItemPopup address={address} basketItems={basketItems} id={id} price={price} contactData={contactData} date={date} status={currentStatus} showPopup={showPopup} setShowPopup={setShowPopup} title={title} />
        </>
    );
}

export default TableItem;
