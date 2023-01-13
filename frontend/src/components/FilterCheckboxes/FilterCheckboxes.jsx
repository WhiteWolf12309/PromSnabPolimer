
import React, { useState, useRef } from 'react';
import { Checkbox } from '@mui/material';

import './FilterCheckboxes.scss'


const FilterCheckboxes = ({ filterTitle, checkboxItems, setFilterData, setFilterList, filterList, filterListTitle }) => {

    const [localCheckboxItems, setLocalCheckboxItems] = useState(checkboxItems)
    const localList = useRef([])

    const  handleCheckboxState = (e) => {
        localCheckboxItems.forEach((item, index) => {
            if (item.id == e.target.value) {
                setLocalCheckboxItems([...checkboxItems.slice(0, index), 
                    {id: index + 1, text: item.text, isChecked: !item.isChecked}, 
                    ...checkboxItems.slice(index + 1)])
                setFilterData([...checkboxItems.slice(0, index), 
                    {id: index + 1, text: item.text, isChecked: !item.isChecked}, 
                    ...checkboxItems.slice(index + 1)]);
                
                if (localList.current.includes(item.text)) {
                    localList.current = localList.current.filter(el => el !== item.text)
                } else {
                    localList.current.push(item.text)
                }

                setFilterList({ ...filterList, [filterListTitle + "s"]: localList.current })
            }
        })
    }


    return (
        <div className="filter__item mrt-10">  
            <div className="filter__item-title">
                {filterTitle }
                
            </div>
            <div className="filter__item-body">
                <div className="default-filter">

                    {checkboxItems && checkboxItems.map(item => (
                        <div key={item.id} className="checkbox-body">
                            <label>
                                <Checkbox value={item.id} onClick={(e) => checkboxItems !== undefined && handleCheckboxState(e)} className='checkbox' color="warning" />
                                <div className="checkbox-text">{item.text}</div>
                            </label>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default FilterCheckboxes;
