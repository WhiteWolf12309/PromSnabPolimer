
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { animateScroll as scroll, Link as AnimateLink } from "react-scroll";

import Basket from '../../assets/images/basket.svg';
import CompanyLogo from '../../assets/images/CompanyLogo.svg';

import './Header.scss';

const Header = () => {

    const [darkHeader, SetDarkHeader] = useState(false);
    const basketItemsTotalPrice = useSelector(state => state.basket.itemsTotalPrice)
    const basketItemsCount = useSelector(state => state.basket.itemsCount)

    const handleScroll = () => {
        const position = window.pageYOffset;

        if (position > 0 && location.pathname === '/') {
            SetDarkHeader(true)
        } else {
            SetDarkHeader(false)
        }
    };


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // {darkHeader ? "header dark-header" : "header"}

    return (
        <div className={location.pathname === "/" || darkHeader ? "header dark-header" : (location.pathname !== "/" && "header dark-header")}>
            <div className="container">
                <div className="header__inner"> 
                    <div className="header__logo">
                        <Link to="/">
                            <img src={CompanyLogo} alt="" />
                        </Link>
                    </div>
                    <nav className="header__nav">
                        <AnimateLink
                            activeClass="active"
                            to='order-calculator'
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={100}
                            style={{ cursor: 'pointer' }}
                        >Заказать
                        </AnimateLink>
                        <AnimateLink 
                            activeClass="active"
                            to='qualities'
                            spy={true}
                            smooth={true}
                            offset={-300}
                            duration={500}
                            style={{ cursor: 'pointer' }}
                        >О компании
                        </AnimateLink>
                        <AnimateLink 
                            activeClass="active"
                            to='order-call'
                            spy={true}
                            smooth={true}
                            offset={-300}
                            duration={500}
                            style={{ cursor: 'pointer' }}
                        >Заказать звонок
                        </AnimateLink>
                        <AnimateLink 
                            activeClass="active"
                            to='our-position'
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            style={{ cursor: 'pointer' }}
                        >Наше местоположение
                        </AnimateLink>
                    </nav>
                    <Link to="/basket" className="header__basket">
                        { basketItemsCount > 0 ? (
                            <div className="basket-items-count">
                                <div className="count">{basketItemsCount}</div>
                            </div>
                        ) : <></>}
                        
                        <img className='basket__img' src={Basket} alt="Корзина" />
                        <div className="basket__price">{basketItemsTotalPrice ? `${basketItemsTotalPrice}₽`: "Корзина"}</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
