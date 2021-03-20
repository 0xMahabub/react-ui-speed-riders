import React, { useState, useEffect } from 'react';
import LandingPage from '../layouts/LandingPage';
import { rides } from '../data/rides';
import RideCard from '../components/RideCard';
import { Link } from 'react-router-dom';

const Home = () => {

    // state
    const [arr, setArr] = useState([]);

    // useEffect
    useEffect(() => setArr([...rides]), [])

    return (
        <LandingPage>
            <div className="cards_container">
                {
                    arr.map(rd => (
                        <Link to={'/ride/' + rd.name} key={rd.name} style={{ textDecoration: 'none', color: '#3b3b3b' }}>
                            <RideCard ride={rd} />
                        </Link>
                    ))
                }
            </div>
        </LandingPage>
    );
};

export default Home;