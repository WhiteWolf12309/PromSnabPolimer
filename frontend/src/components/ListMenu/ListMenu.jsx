import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { v4 as uuidv4 } from 'uuid';

import accordionArrow from '../../assets/images/Arrow-down.svg'

export default function BasicMenu({ defaultState, ListOfStates, setDataGrab }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [data, setData] = useState(defaultState)
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setData(event.target.innerText || data)
        setDataGrab(event.target.innerText || data)
        setAnchorEl(null);
    };


    return (
        <div className='location-menu'>
            <Button
                id="basic-button"
                className='location-btn'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <div className="location-btn-title">{data}</div>

                <img className='location-btn-arrow' style={open ? { transform:'rotate(deg180)'} : {} } src={accordionArrow} alt="" />
                

            </Button>
            <Menu
                id="basic-menu" 
                className="location-menu-body" 
                anchorEl={anchorEl} 
                open={open} 
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >

            {ListOfStates.map(item => {
                return (
                    <MenuItem key={uuidv4()} onClick={handleClose}>
                        <div className="btn" >{item.text}</div>
                    </MenuItem>
                )
            })}

            </Menu>
        
        </div>
    );
}





