
import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';

import Position from '../../assets/images/position.svg'
import MobilePhone from '../../assets/images/mobile-phone.svg'
import Email from '../../assets/images/email.svg'

import './OurPosition.scss'

const OurPosition = () => {
    return (
        <div className='our-position' id='our-position'>
            <div className="container">
                <SectionTitle title={"Где мы находимся"} />
                <div className="our-position__inner">
                    <div className="map">
                        <div className="map__title">Наше местоположение на карте</div>
                        <div className="map__body">
                            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A11816a28aaf454c068add8b75908d0c20892eceaf9133cccee7109845b47ff74&amp;source=constructor" width="100%" height="500px" frameBorder="0"></iframe>
                        </div>
                    </div>
                    <div className="contact-data">
                        <div className="contact-data__item">
                            <div className="item__title">Адрес</div>
                            <div className="item__body">
                                <div className="elem">
                                    <img className='body__image' src={Position} />
                                    <div className="body__text">г. Заречный, улица, д. 10</div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-data__item mrt-20">
                            <div className="item__title">Контактные данные</div>
                            <div className="item__body">
                                <div className="elem">
                                    <img className='body__image' src={MobilePhone} />
                                    <div className="body__text">+7 353 245 34 23</div>
                                </div>
                                <div className="elem mrt-10">
                                    <img className='body__image' src={MobilePhone} />
                                    <div className="body__text">+7 435 645 76 34</div>
                                </div>
                                <div className="elem mrt-10">
                                    <img className='body__image' src={Email} />
                                    <div className="body__text">emailexample@gmail.com</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurPosition;
