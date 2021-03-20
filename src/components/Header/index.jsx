import React, { useEffect, useState } from 'react';
import './header.scss';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { VscMenu, VscChromeClose } from "react-icons/vsc";



// menu
const NavMenu = ({ user, logoutBtn, isMobile }) => {
    return (
        <ul className={`${ isMobile ? 'mobile_nav' : 'menu' }`}>
                        <li>
                            <Link to="/">home</Link>
                        </li>
                        <li>
                            <Link to="/ride/bike">destination</Link>
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
                                    <li key={'x923irhuf'} className="user_li">
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
    )
}






const HeaderArea = () => {
    // history
    const history = useHistory();

    // responsive
    const [width, setWidth] = useState(window.innerWidth);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        const resizeScreen = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', resizeScreen);
        return () => {
            window.removeEventListener('resize', resizeScreen)
        }
    }, []);

    const toggleMobileNav = () => setMobile(!mobile)

    let mobileNavMaxWidth = mobile ? '320px' : '0';

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

                    {
                        width >= 800 ? (
                            <NavMenu user={user} logoutBtn={logoutBtn} isMobile={mobile} />
                        ) : (
                            <div className="mobile_menu">
                                <span className="toggle_btn" onClick={toggleMobileNav}><VscMenu /></span>
                                <div className="mobile_menu_container" style={{
                                    maxWidth: mobileNavMaxWidth
                                }}>
                                    <span className="toggle_btn" onClick={toggleMobileNav}>
                                        <VscChromeClose />
                                    </span>

                                    <NavMenu user={user} logoutBtn={logoutBtn} isMobile={mobile} />
                                </div>
                            </div>
                        )
                    }

                </nav>
            </div>
        </header>
    );
};

export default HeaderArea;