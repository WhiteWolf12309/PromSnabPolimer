
import React from 'react';

import './FilterInputs.scss'

const FilterInputs = ({ filterTitle, inputValue, setInputValue }) => {

    const handleFrom = (e) => setInputValue({...inputValue, from: e.target.value})
    const handleTo = (e) => setInputValue({...inputValue, to: e.target.value})

    return (
         <div className="filter__item">
            <div className="filter__item-title">
                {filterTitle}
            </div>
            <div className="filter__item-body">
                <div className="input-range">
                    <div className="input-range-title">от</div>
                    <input value={inputValue.from} onChange={(e) => handleFrom(e)} className='input' type="number" placeholder='24' />
                </div>
                <div className="input-range">
                    <div className="input-range-title">до</div>
                    <input value={inputValue.to} onChange={(e) => handleTo(e)} className='input' type="number" placeholder='24353' />
                </div>
            </div>
        </div>
    );
}

export default FilterInputs;
