
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CompanyLogo from '../../assets/images/company-logo.svg'
import DashBoardPanelIcon from '../../assets/images/dashboard-icon.svg'
import OrderIcon from '../../assets/images/order-icon.svg'
import SupportIcon from '../../assets/images/support-icon.svg'
import ProductIcon from '../../assets/images/products-icon.svg'

import './Sidebar.scss'

const Sidebar = () => {

    // eslint-disable-next-line no-restricted-globals
    const [isVisible, setIsVisible] = useState(!!(location.pathname === '/auth'))

    return (
        <div className='sidebar' style={{ display: (isVisible && "none") }}>
            <div className="sidebar__inner">
                <div className="sidebar__inner__logo">
                    <img className='comapany__logo' src={CompanyLogo} alt="ПромСнабПолимер" />
                </div>
                <nav className="sidebar__inner__nav">
                    <Link to="/" className="nav-item">
                        <img className='nav-item__img' src={DashBoardPanelIcon} alt="" />
                        <div className="nav-item__name">Панель</div>
                    </Link>
                    <Link to="/orders" className="nav-item">
                        <img className='nav-item__img' src={OrderIcon} alt="" />
                        <div className="nav-item__name">Заказы</div>
                    </Link>
                    <Link to="/support" className="nav-item">
                        <img className='nav-item__img' src={SupportIcon} alt="" />
                        <div className="nav-item__name">Поддержка</div>
                    </Link>
                    <Link to="/products" className="nav-item">
                        <img className='nav-item__img' src={ProductIcon} alt="" />
                        <div className="nav-item__name">Товары</div>
                    </Link>
                </nav>
                <div className="sidebar__inner__profile">
                    <div className="profile__img" ></div>
                    <div className="profile__info">
                        <div className="profile__info__names">Фамилия, Имя сотрудника</div>
                        <div className="profile__info__post">Должность</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
