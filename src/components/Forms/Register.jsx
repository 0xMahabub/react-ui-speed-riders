import React, { useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './forms.scss';
import classNames from 'classnames';
import { FcGoogle } from 'react-icons/fc';
import { emailPasswordsignUp } from '../../services/Auth/SIgnUp';
import { googleSignIn } from '../../services/Auth/SignIn';
import { useUserContext } from '../../context/userContext';

const RegisterForm = () => {
    // custom errors
    const [formErrors, setFormErrors] = useState('');


    // route handle
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || {from: '/'};

    // user context
    const { loginUser } = useUserContext();

    // react-hook-form
    const { register, handleSubmit, errors, watch } = useForm({ mode: 'all' });
    const onFormSubmit = async (data) => {
        console.log("from-ReactHookFrom", data);
        await emailPasswordsignUp(data)
        .then(response => {
            if (response.error) {
                // got error
                setFormErrors(response.error.message);
            } else {
                //ok
                console.log('successfully loggedIn');
                console.log(response);
                // saving in context
                loginUser({
                    name: response.displayName || '',
                    email: response.email
                })
                history.replace(from)
            }
        })
        .catch(err => console.log(err))
    }

    // confirm password
    const pwd = useRef({});
    pwd.current = watch("password", "")


    // google login
    const continueWithGoogle = () => {
        googleSignIn()
        .then(data => {
            //ok
            console.log(data);
            // saving in context
            loginUser({
                name: data.displayName,
                email: data.email
            })
            history.replace(from)
        })
        .catch(err => {
            console.log(err);
            setFormErrors(err.message)
        })
    }



    return (
        <div className="form_container">
            <form autoComplete='off' className='form_area' onSubmit={handleSubmit(onFormSubmit)}>
                <h2>Create an account</h2>
                {formErrors.length >= 1 && (<span className="form-err err-xl">{formErrors}</span>)}

                <input name='name' placeholder='Name'
                    type='text' ref={register({
                        required: {
                            value: true,
                            message: 'Name is required'
                        },
                        minLength: { value: 5, message: 'Minimum 5 character is required' },
                        maxLength: {
                            value: 32,
                            message: 'Maximum 32 character can be allowed'
                        },
                        pattern: {
                            value: /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/g,
                            message: 'Please provide your valid Full Name'
                        }
                    })}
                    className={classNames({'form-invalid': errors.name})}
                />
                {errors.name && (<span className="form-err">{errors.name.message}</span>)}

                <input name='email' placeholder='Email Address'
                    type='email' ref={register({
                        required: {
                            value: true,
                            message: 'Email Address is required'
                        },
                        minLength: { value: 8, message: 'Minimum 8 character is required' },
                        maxLength: {
                            value: 32,
                            message: 'Maximum 32 character can be allowed'
                        },
                        pattern: {
                            value: /^\S[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\S$/,
                            message: 'Please provide your valid Email Address'
                        }
                    })}
                    className={classNames({'form-invalid': errors.email})}
                />
                {errors.email && (<span className="form-err">{errors.email.message}</span>)}


                <input name='password' placeholder='Password'
                    type='password' ref={register({
                        required: {
                            value: true,
                            message: 'Password is required'
                        },
                        minLength: { value: 8, message: 'Minimum 8 character is required' },
                        maxLength: {
                            value: 32,
                            message: 'Maximum 32 character can be allowed'
                        },
                        pattern: {
                            value: /^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/g,
                            message: 'Please make your Password more strong'
                        }
                    })}
                    className={classNames({'form-invalid': errors.password})}
                />
                {errors.password && (<span className="form-err">{errors.password.message}</span>)}


                <input name='c_password' placeholder='Confirm Password'
                    type='password' ref={register({
                        required: {
                            value: true,
                            message: 'Confirm Password is required'
                        },
                        minLength: { value: 8, message: 'Minimum 8 character is required' },
                        maxLength: {
                            value: 32,
                            message: 'Maximum 32 character can be allowed'
                        },
                        validate: val => val === pwd.current || "Passwords are not matched"
                    })}
                    className={classNames({'form-invalid': errors.c_password})}
                />
                {errors.c_password && (<span className="form-err">{errors.c_password.message}</span>)}



                <button type="submit">
                    Create an account
                </button>

                <p>Already have an account? <Link to="/login">Login</Link></p>
                {/* <p>{process.env.REACT_APP_apiKey}</p> */}
            </form>

            <div className="or_bar">
                <span className="bar"></span>
                <span>or</span>
            </div>

            <ul className="oauth-btns">
                <li className="btn-oauth" onClick={() => continueWithGoogle()}>
                    <FcGoogle />
                    <span className="btn-txt">continue with google</span>
                </li>
            </ul>
        </div>
    );
};

export default RegisterForm;