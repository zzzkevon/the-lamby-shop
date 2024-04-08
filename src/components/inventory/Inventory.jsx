import React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { useTheme } from '@mui/system';
import item1 from '../../images/img1.jpeg';
import item2 from '../../images/img2.jpeg';
import item3 from '../../images/img3.jpeg';
import charm1 from '../carousel2/apple.jpeg'
import charm2 from '../carousel2/lemon_yellow.jpeg';
// Will need to implement AWS 

function useIsDarkMode() {
    const theme = useTheme();
    return theme.palette.mode === 'dark';
}

function itemInformation() {
    let itemName = "itemName";
    let itemDescr = "Placeholder";
    let itemPrice = "0.00";
    return (
        <div>
            itemName = {itemName}<br />
            itemDescr = {itemDescr}<br />
            itemPrice = {itemPrice}<br />
            <br />
            <button className="add-to-cart-button" >
                Add to Cart
            </button>
        </div>
    )
}

const Inventory = () => {

    // *********** TEST START ***********
    let itemInfo = itemInformation();
    const [anchor, setAnchor] = React.useState(null);
  
    // const handleClick = (event) => {
    //   setAnchor(anchor ? null : event.currentTarget);
    // };
    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;
    // *********** TEST END ***********
    return (
        <div className="tile-container">
            <div className="tile" onClick={handleClick}>
                <img src={item1} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={item2} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={item3} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={charm1} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={charm2} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={item1} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={item2} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={item3} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={charm1} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={charm2} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={item1} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={item2} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={item3} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={charm1} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            <div className="tile" onClick={handleClick}>
                <img src={charm2} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}/>
            </div>
            {open && (
                <div className="modal-overlay" onClick={handleClose}>
                    <BasePopup
                        id={id}
                        open={open}
                        anchor={anchor}
                        disablePortal
                        className="popup-content"
                    >
                        {itemInfo}
                    </BasePopup>
                </div>
            )}
        </div>
    );
    
}

export default Inventory