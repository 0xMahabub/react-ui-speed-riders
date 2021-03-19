import React from 'react';
import './header.scss';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';



const HeaderArea = () => {
    const history = useHistory();

    // user context
    const { user, logoutUser } = useUserContext();

    const logoutBtn = async () => {
        await logoutUser()
        history.replace('/')
    }


    return (
        <header className="header_area">
            <div className="container">
                <nav className="navbar">
                    <div className="logo_area">
                        {/* <img src={logo} alt="logo" className="logo" /> */}
                        <span className="logo">
                            speed riders
                        </span>
                    </div>

                    <ul className="menu">
                        <li>
                            <Link to="/">home</Link>
                        </li>
                        <li>
                            <Link to="/destination">destination</Link>
                        </li>
                        <li>
                            <Link to="/blog">blog</Link>
                        </li>
                        <li>
                            <Link to="/contact">contact</Link>
                        </li>
                        {
                            user.isAuth === false ? (
                                <li key={'023duf7f'}>
                                    <Link to="/login" className="btn-nav">login</Link>
                                </li>
                            ) : (
                                <>
                                    <li key={'x923irhuf'}>
                                        <span style={{ fontWeight: '700', textTransform: 'inherit' }}>
                                            {user.name || user.email}
                                        </span>
                                    </li>
                                    <li key={'ajhfue93'}>
                                        <span className="btn-nav" onClick={() => logoutBtn()}>logout</span>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default HeaderArea;