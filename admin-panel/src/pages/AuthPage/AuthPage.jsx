
import React, { useState } from 'react';
import getCurrentDate from '../../helpers/getCurrentDate';
import axios from 'axios';
import { settings } from '../../helpers/toastify-configurations.js'
import { toast } from 'react-toastify';

import AuthEmail from '../../assets/images/auth-email.svg'
import AuthPassword from '../../assets/images/auth-password.svg'

import './AuthPage.scss'

const AuthPage = () => {

    const [adminData, setAdminData] = useState({email: '', password: ''})
    const [isValid, setIsValid] = useState(true)

    const sendData = async () => {
        
        setAdminData({...adminData, date: getCurrentDate()})

        await axios.post("http://localhost:3001/panel/signin", adminData)
        .then(res => {
            if (res.data.status === "success") {
                toast.success(res.data.message, settings)
            } else if (res.data.status === "error") {
                toast.error(res.data.message, settings)
            }
        })
        .catch(err => {
            toast.error("Что-то пошло не так, попробуйте позже", settings)
        })
        
        setAdminData({email: '', password: ''})
    }

    return (
        <div className='auth-page'>
            <div className="auth-page__inner">
                <div className="auth-page__body">
                    
                    <div className="body__title">Вход в систему</div>
                    <div className="input__field">
                        <img className='input__img' src={AuthEmail} alt="Почта" />
                        <input 
                        placeholder="Введите почту" 
                        className='body__input' 
                        type="email" 
                        spellCheck="false"
                        value={adminData.email}
                        name="email"
                        onChange={e => setAdminData({...adminData, email: e.target.value})}
                        />
                    </div>
                    <div className="input__field">
                        <img className='input__img' src={AuthPassword} alt="Пароль" />
                        <input 
                        placeholder="Введите пароль" 
                        className='body__input' 
                        type="password" 
                        spellCheck="false"
                        name="password"
                        value={adminData.password}
                        onChange={e => setAdminData({...adminData, password: e.target.value})}
                        />
                    </div>
                    
                    <div className="body__forgot-password">Не помню пароль</div>
                    <button disabled={!(adminData.email && adminData.password)} onClick={sendData} className='btn-auth log-in'>Войти</button>
                    
                </div>
            </div>
            
        </div>
    );
}

export default AuthPage;
