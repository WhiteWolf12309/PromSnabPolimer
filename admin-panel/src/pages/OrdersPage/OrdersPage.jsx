
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableItem from '../../components/TableItem/TableItem';
import Plus from '../../assets/images/Plus.svg'
import Popup from '../../components/Popup/Popup';

import './OrdersPage.scss'

const OrdersPage = () => {

    const [tableItems, setTableItems] = useState([])
    const [tableItemsFiltered, setTableItemsFiltered] = useState([])
    const [btnActive, setBtnActive] = useState('new-order')
    const [popup, setPopup] = useState(false)


    const showPopup = () => {
        setPopup(true) 
    }

    const getFilteredTable = ( tableState ) => {
        setTableItemsFiltered(tableItems.filter(item => item.status === tableState))
        setBtnActive(tableState)
    }

    useEffect(() => {
        getData()
    })

    const getData = async () => {
        await axios("http://localhost:3001/products")
        .then(res => {
            setTableItems(res.data)
        })
    }

    return (
        <div className='orders-page'>
            <div className="orders-page__inner">
                <div className="inner__buttons">
                    <div className="left">
                        <div className={btnActive === 'new-order' ? "button br-tl-8 active" : "button br-tl-8"} onClick={() => getFilteredTable('new-order')}>Новые заказы</div>
                        <div className={btnActive === 'in-process' ? "button active" : "button"} onClick={() => getFilteredTable('in-process')}>Заказы в процессе</div>
                        <div className={btnActive === 'completed' ? "button br-tr-8 active" : "button br-tr-8"} onClick={() => getFilteredTable('completed')}>Завершённые заказы</div>
                    </div>
                    <div className="right">
                        <div className="add-order__btn" onClick={showPopup}>
                            <div className="add-order__btn-text">Добавить заказ</div>
                            <img className='add-order__btn-img' src={Plus} alt="Добавить" />
                        </div>
                    </div>
                    
                </div>
                <div className="inner__body">
                    <div className="table__units">
                        <div className="unit__order-id">№</div>
                        <div className="unit__order-body">Содержимое</div>
                        <div className="unit__order-price">Сумма (₽)</div>
                        <div className="unit__order-contact-data">Контактные данные</div>
                        <div className="unit__order-place">Адрес</div>
                        <div className="unit__order-date">Дата заказа</div>
                        <div className="unit__order-order">Доставка</div>
                        <div className="unit__order-status">Статус</div>
                    </div>
                    <div className="table__body">
                        {tableItemsFiltered.map(order => {
                            return <TableItem 
                                key={order.UID}
                                id={order.UID}
                                title={[].concat(order.items)}
                                basketItems={order.basketItems && [].concat(order.basketItems) }
                                price={order.totalPrice}
                                contactData={order.contactData}
                                date={order.date}
                                isWithOrder={order.isWithOrder}
                                address={order.address || "Не указан"}
                                status={order.status}
                            />
                        })}
                    </div>
                </div>
            </div>
            <Popup popup={popup} setPopup={setPopup} />
        </div>
    );
}

export default OrdersPage;
