
import React from 'react';

import './Type-column.scss'

const TypeColumn = ({ className, fill }) => {
    // #fff
    return (
        <svg className={className} width="35" height="30" viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="21.6667" width="9.16667" height="8.33333" fill={fill}/>
            <rect x="12.5" y="21.6667" width="9.16667" height="8.33333" fill={fill}/>
            <rect y="21.6667" width="9.16667" height="8.33333" fill={fill}/>
            <rect x="25" y="10.8334" width="9.16667" height="8.33333" fill={fill}/>
            <rect x="12.5" y="10.8334" width="9.16667" height="8.33333" fill={fill}/>
            <rect y="10.8334" width="9.16667" height="8.33333" fill={fill}/>
            <rect x="12.5" width="9.16667" height="8.33333" fill={fill}/>
            <rect width="9.16667" height="8.33333" fill={fill}/>
            <rect x="25" width="9.16667" height="8.33333" fill={fill}/>
        </svg>
    );
}

export default TypeColumn;
