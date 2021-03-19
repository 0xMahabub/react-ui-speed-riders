import React from 'react';
import HeaderArea from '../components/Header';
import './default.scss';

const LandingPage = ({ children, ...rest }) => {
    return (
        <div className="landing_page">
            <HeaderArea />
            
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default LandingPage;