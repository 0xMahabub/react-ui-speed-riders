import React, { useState } from 'react';
import './search.scss';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { FiUsers } from "react-icons/fi";



const SearchForm = ({ rideType }) => {
    console.log(rideType)

    // result state
    const [result, setResult] = useState({
        dest: {
            from: '', to: ''
        },
        ride: rideType,
        users: 4,
        price: 67,
        status: false
    });

    // update result
    const editResult = (ctx) => {
        setResult({
            ...ctx,
            ride: rideType
        });
        // console.log(result);
    }

    

    

    return (
        <div className="search_container">
            {
                result && result.status === true ? (
                    <SearchResultArea infos={result} />
                ) : (
                    <SearchFormArea editResult={editResult} rstate={result} />
                ) 
            }
        </div>
    );
};





// search result component
const SearchResultArea = ({ infos }) => {
    return (
        <div className="pick_form">
            <div className="result_destination">
                <div className="symbol">
                    <span></span>
                </div>
                <div className="info">
                    <span>{ infos.dest?.from }</span>
                    <span>{ infos.dest?.to }</span>
                </div>
            </div>

            <div className="result_card_container">
                <ResultCard info={infos} />
                <ResultCard info={infos} />
                <ResultCard info={infos} />
            </div>
        </div>
    )
}

// result cards
const ResultCard = ({ info }) => {
    return (
        <div className="result_card">
            <div className="wrap_left">
                <img src={info.ride?.img} alt='ride details' />
                <h5>{info.ride?.name}</h5>
                <span>
                    <span><FiUsers /></span>
                    <span>{info.users}</span>
                </span>
            </div>

            <div className="wrap_right">
                <p>{`$${info.price}`}</p>
            </div>
        </div>
    )
}






// sub component
const SearchFormArea = ({ editResult, rstate }) => {


     // react-hook-form
    const { register, handleSubmit, errors } = useForm({ mode: 'all' });
    const onHandleFormSubmit = (data) => {
        // console.log(data);
        let updateResult = {
            ...rstate,
            dest: { from: data.from, to: data.to},
            status: true
        };
        editResult(updateResult);
    }



    return (
        <form className="pick_form" autoComplete='off' onSubmit={handleSubmit(onHandleFormSubmit)}>
                <label htmlFor="pick_from">pick from {errors.from && (<span className="form-err">{errors.from.message}</span>)}</label>
                <input id='pick_from' name='from' type='text' 
                    className={classNames({'form-invalid': errors.from})}
                    placeholder='Mirpur 1' ref={register({
                        required: {
                            value: true,
                            message: '* This is required'
                        }
                    })}
                />
                

                <label htmlFor='pick_to'>pick to {errors.to && (<span className="form-err">{errors.to.message}</span>)}</label>
                <input id='pick_to' name='to' type='text' 
                    className={classNames({'form-invalid': errors.to})}
                    placeholder='Dhanmondi' ref={register({
                        required: {
                            value: true,
                            message: '* This is required'
                        }
                    })}
                />

                <button type="submit" className="btn-submit">search</button>
            </form>
    )
}








export default SearchForm;