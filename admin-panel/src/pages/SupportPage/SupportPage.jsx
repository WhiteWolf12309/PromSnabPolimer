
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableItemSupport from '../../components/TableItemSupport/TableItemSupport';

import './SupportPage.scss'

const SupportPage = () => {

    const [tableItems, setTableItems] = useState([])
    const [tableItemsFiltered, setTableItemsFiltered] = useState([])
    const [btnActive, setBtnActive] = useState('new-problem')

    const getFilteredTable = ( tableState ) => {
        setTableItemsFiltered(tableItems.filter(item => item.status === tableState))
        setBtnActive(tableState)
    }

    useEffect(() => {
        getData()
    })

    const getData = async () => {
        await axios("http://localhost:3001/order-call")
        .then(res => {
            setTableItems(res.data)
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    return (
        <div className='support-page'>
            <div className="support-page__inner">
                <div className="inner__buttons">
                    <div className={btnActive === 'new-problem' ? "button br-tl-8 active" : "button br-tl-8"} onClick={() => getFilteredTable('new-problem')}>Новые вопросы</div>
                    <div className={btnActive === 'in-process' ? "button active" : "button"} onClick={() => getFilteredTable('in-process')}>Вопросы в процессе</div>
                    <div className={btnActive === 'completed' ? "button br-tr-8 active" : "button br-tr-8"} onClick={() => getFilteredTable('completed')}>Решённые вопросы</div>
                </div>
                <div className="inner__body">
                    <div className="table__units">
                        <div className="unit__order-body">Содержимое</div>
                        <div className="unit__order-contact-data">Контактные данные</div>
                        <div className="unit__order-name">Имя адресата</div>
                        <div className="unit__order-date">Дата заказа</div>
                        <div className="unit__order-status">Статус</div>
                    </div>
                    <div className="table__body">
                        { tableItemsFiltered.map(order => {
                            return <TableItemSupport 
                                key={order.UID}
                                id={order.UID}
                                contactData={order.contactData}
                                name={order.name || "Не указано"}
                                date={order.date || "Не указано" }
                                status={order.status}
                                problem={order.problem}
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupportPage;
