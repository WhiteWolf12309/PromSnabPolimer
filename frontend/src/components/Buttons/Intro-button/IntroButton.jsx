
import React from 'react';

import './IntroButton.scss'

const IntroButton = ({ text, img }) => {
    return (
        <button className='intro-button'>
            <div className="intro-button__text">
                { text }
            </div>
            {img && (
                <img className='intro-button__img' src={img} alt="" />
            )}
        </button>
    );
}

export default IntroButton;
