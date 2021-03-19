import React from 'react';
import Default from '../layouts/Default';
import { useHistory } from 'react-router-dom';
import error404svg from '../images/error_404.svg';
import { VscArrowLeft } from "react-icons/vsc";

const Notfound = () => {

    const history = useHistory();

    return (
        <Default>
            <div className="page_404">
                <img src={error404svg} alt="page-not-found" />
                <h1>Page not found!</h1>
                <p>
                    <span className="goback" onClick={() => history.goBack()}>
                        <VscArrowLeft /> <span>go back</span>
                    </span>
                </p>
            </div>
        </Default>
    );
};

export default Notfound;