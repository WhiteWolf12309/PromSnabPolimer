
import React from 'react';

import './Footer.scss'
import UpArrow from '../../assets/images/up-arrow.svg'
import CompanyLogoFooter from '../../assets/images/company-footer.svg'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="container">
                <div className="footer__inner">
                    <img className="company__logo" src={CompanyLogoFooter} />
                    <div className="up">
                        <img src={UpArrow} alt="Наверх" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
