
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { endpoints } from '../../api/index';
import { getCurrentDate } from '../../helpers/getCurrentDate';
import SectionTitle from '../SectionTitle/SectionTitle';

import Plane from '../../assets/images/plane.svg';
import './OrderCall.scss';

const OrderCall = () => {

    const sendData = async (data) => {

        const finalData = {
            id: uuidv4(),
            name: data.name,
            contactData: data['contact-data'],
            date: data.date,
            problem: data.problem
        }

        await axios({
            method: "post",
            url: endpoints.ORDER_CALL,
            data: finalData
        })
        .then((res) => {
            toast.success(`Ваша заявка на звонок успешно принята. Ожидайте звонка`, {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const {
        register,
        formState: {
            errors,
            isValid
        }, 
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur"
    })

    const onSubmit = (data) => {
        const formData = data

        formData.date = getCurrentDate()
        reset()
        sendData(formData)
    }


    return (
        <div className='order-call' id='order-call'>
            <div className="container">
                <SectionTitle title={"Заказать звонок"} />

                <form onSubmit={handleSubmit(onSubmit)}>   
                    <div className="order-call__inner">
                        <div className="left-side">
                            <input 
                                spellCheck="false" 
                                placeholder='Как вас зовут?' 
                                className='input' 
                                type="text" 
                                {...register('name', {
                                    required: true
                                })}
                            />
                            <input 
                                spellCheck="false" 
                                placeholder='Укажите ваши контактные данные (email или номер телефона)' 
                                className='input' 
                                type="text" 
                                {...register('contact-data', {
                                    required: true
                                })}
                            />
                        </div>
                        <div className="right-side">
                            <textarea 
                                className='textarea' 
                                placeholder='Объясните вашу проблему как можно подробнее, а наши мастера свяжутся с вами максимально быстро для уточнения деталей' 
                                name="problem" 
                                {...register('problem', {
                                    required: true
                                })}    
                                />
                        </div>
                    </div>

                    <div className="order-call__footer">
                        <button disabled={!isValid} type='submit' className={ isValid ? "send-all-query" : "send-all-query btn-disabled"}>
                            Отправить
                            <img src={Plane} alt="" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OrderCall;
