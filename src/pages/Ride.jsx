import React from 'react';
import {
    useParams
} from 'react-router-dom';
import Default from '../layouts/Default';

const Ride = () => {

    let { rideType } = useParams();

    return (
        <Default>
            <h1>Ride: {rideType}</h1>
        </Default>
    );
};

export default Ride;