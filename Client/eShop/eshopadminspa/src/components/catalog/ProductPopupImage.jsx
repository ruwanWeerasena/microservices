import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const ProductPopupImage = () => {
    const [anchor, setAnchor] = React.useState(null);

    const handleClick = (event) => {
      setAnchor(anchor ? null : event.currentTarget);
    };
  
    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;
    return (
        <div>
          <Button aria-describedby={id} type="button" onClick={handleClick}>
            Toggle Popup
          </Button>
          <BasePopup id={id} open={open} anchor={anchor}>
            <div>The content of the Popup.</div>
          </BasePopup>
        </div>
      );
}

export default ProductPopupImage