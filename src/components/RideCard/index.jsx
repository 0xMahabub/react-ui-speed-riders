import React from 'react';
import './ride_card.scss';

const RideCard = ({ ride: { name, img }}) => {
    return (
        <div className="ride_card">
            <img src={img} alt={name} />
            <h3>{name}</h3>
        </div>
    );
};

export default RideCard;