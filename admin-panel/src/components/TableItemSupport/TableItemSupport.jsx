
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './TableItemSupport.scss'


const TableItemPopupSupport = ({ id, name, problem, contactData, date, status, setShowPopup, showPopup }) => {

    const [localStatus, setLocalStatus] = useState(status)

    const disablePopupHandler = () => setShowPopup(false)
    const showPopupHandler = (e) => {
        e.stopPropagation()
    }


    const completeOrderCall = async () => {
        sendChangedOrderCall('completed')
    }

    const acceptOrderCall = async () => {
        sendChangedOrderCall('in-process')
    }

    const rejectOrderCall = async () => {
        sendChangedOrderCall('rejected')
    }

    const sendChangedOrderCall = async ( status ) => {
        await axios.put("http://localhost:3001/order-call", {
            id,
            status: status
        })
        .then(res => {
            setLocalStatus(res.data.status)
        })
        .catch(err => {
            console.log(err)
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
                            <div className="upper__item-body titles">{problem}</div>
                        </div>
                    </div>
                    <div className="popup__body-lower">
                        <div className="lower__item">
                            <div className="lower__item-title">Имя адресата</div>
                            <div className="lower__item-body">{name}</div>
                        </div>
                        <div className="lower__item">
                            <div className="lower__item-title">Контактные данные</div>
                            <div className="lower__item-body">{contactData}</div>
                        </div>
                        <div className="lower__item">
                            <div className="lower__item-title">Дата заказа</div>
                            <div className="lower__item-body">{date}</div>
                        </div>
                    </div>
                </div>
                <div className="popup__buttons">
                    {localStatus === 'new-problem' || localStatus === 'in-process' ? (
                        <button className="popup__buttons-reject" onClick={rejectOrderCall}>Отклонить звонок</button>
                    ) : (<></>)}
                    {localStatus === 'new-problem' && (
                        <button className="popup__buttons-accept" onClick={acceptOrderCall}>Принять звонок</button>
                    )}
                    {localStatus === 'in-process' && (
                        <button className="popup__buttons-accept" onClick={completeOrderCall}>Принять звонок</button>
                    )}
                </div>
            </div>
        </div>
    )
}



const TableItemSupport = ({ id, name, problem, contactData, date, status}) => {

    const [currentStatus, setCurrentStatus] = useState(status)
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        getCurrentProductStatus()
    }, [])

    const getCurrentProductStatus = () => {
        if (status === 'new-problem') {
            setCurrentStatus('Ожидает подтверждения')
        } else if (status === 'in-process') {
            setCurrentStatus("В процессе")
        } else if (status === 'completed') {
            setCurrentStatus("Вопрос решён")
        }
    }

    const showPopupHandler = () => {
        setShowPopup(true)
    }

    return (
        <>
            <div className="body__item-support" onClick={() => showPopupHandler()}>
                <div className="body__item-support-body">{problem}</div>
                <div className="body__item-support-contact-data">{contactData}</div>
                <div className="body__item-support-name">{name}</div>
                <div className="body__item-support-date">{date}</div>
                {status === 'new-problem' &&<div className="body__item-support-status new-problem">{currentStatus}</div>}
                {status === 'in-process' &&<div className="body__item-support-status in-process">{currentStatus}</div>}
                {status === 'completed' &&<div className="body__item-support-status completed">{currentStatus}</div>}
            </div>
            <TableItemPopupSupport id={id} contactData={contactData} date={date} status={currentStatus} showPopup={showPopup} setShowPopup={setShowPopup} name={name} problem={problem} />
        </>
       
    );
}

export default TableItemSupport;
