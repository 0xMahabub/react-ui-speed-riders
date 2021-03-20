import React, { useState, useEffect } from 'react';
import {
    useParams, useHistory
} from 'react-router-dom';
import Default from '../layouts/Default';
import Search from '../components/Search';
import Map from '../components/Map';
import { rides } from '../data/rides';

const Ride = () => {
    // params
    let { rideType } = useParams();

    // route
    const history = useHistory();

    //state
    const [type, setType] = useState({
        name: '', img: ''
    });

    // useEffect
    useEffect(() => {
        let currentRide = rides.filter(r => r.name === rideType)[0];

        if (! currentRide) {
            // alert('got 404');
            history.replace(`/404`, {
                message: `"${rideType}" couldn't be found in rides`
            });
        } else {
            // console.log("current-ride: ", currentRide);
            setType({ name: currentRide.name, img: currentRide.img })
        }
        
    }, [rideType, history]);

    return (
        <Default>
            <div className="ride_detail">
                <Search rideType={type} />
                <Map />
            </div>
        </Default>
    );
};

export default Ride;