import React from 'react';
import HeaderArea from '../components/Header';
import './default.scss';

const DefaultLayout = ({ children, ...rest }) => {
    return (
        <div className="layout">
            <HeaderArea />
            
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default DefaultLayout;