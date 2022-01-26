import React from 'react';
import {Popup} from 'react-leaflet';

const MarkerPopup = (props) => {
  const { id } = props.data;


  return  (<Popup>
    <div className='poup-text'>{id}</div>
  </Popup>);
};

export default MarkerPopup;
