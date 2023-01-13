
import React from 'react';

import './Typerow.scss'

const Typerow = ({ className, fill }) => {
    // #888888
    return (
        <svg className={className} width="35" height="30" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="21.6667" width="35" height="8.33333" fill={fill} /> 
            <rect y="10.8334" width="35" height="8.33333" fill={fill} />
            <rect width="35" height="8.33333" fill={fill} />
        </svg>
    );
}

export default Typerow;
