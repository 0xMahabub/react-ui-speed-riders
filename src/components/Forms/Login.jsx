import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './forms.scss';
import classNames from 'classnames';
import { googleSignIn, emailPasswordSignIn } from '../../services/Auth/SignIn';
import { FcGoogle } from 'react-icons/fc';
import { useUserContext } from '../../context/userContext';



const LoginForm = () => {

    // route handle
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || {from: '/'};

    // custom errors
    const [formErrors, setFormErrors] = useState('');

    // user context
    const { loginUser } = useUserContext();

    // react-hook-form
    const { register, handleSubmit, errors } = useForm({ mode: 'all' });
    const onFormSubmit = async (data) => {
        await emailPasswordSignIn(data)
        .then(data => {
            if (data.error) {
                // got error
                if (data.error.code === 'auth/wrong-password') {
                    setFormErrors('Wrong Password')
                } else {
                    setFormErrors(data.error.message)
                }
            } else {
                //ok
                console.log('successfully loggedIn');
                // saving in context
                loginUser({
                    name: data.displayName || '',
                    email: data.email
                })
                history.replace(from)
            }
        })
        .catch(err => console.log(err))
    }

    // google login
    const loginWithGoogle = () => {
        googleSignIn()
        .then(data => {
            // ok
            // saving in context
            loginUser({
                name: data.displayName,
                email: data.email
            })
            history.replace(from)
        })
        .catch(err => {
            // error
            console.log(err);
            setFormErrors(err.message);
        })
    }



    return (
        <div className="form_container">
            <form autoComplete='off' className='form_area' onSubmit={handleSubmit(onFormSubmit)}>
                <h2>Login</h2>

                {formErrors.length >= 1 && (<span className="form-err err-xl">{formErrors}</span>)}

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


                <button type="submit">
                    Login
                </button>

                <p>Don't have any account? <Link to="/register">Create an account</Link></p>
                {/* <p>{process.env.REACT_APP_apiKey}</p> */}
            </form>

            <div className="or_bar">
                <span className="bar"></span>
                <span>or</span>
            </div>

            <ul className="oauth-btns">
                <li className="btn-oauth" onClick={loginWithGoogle}>
                    <FcGoogle />
                    <span className="btn-txt">continue with google</span>
                </li>
            </ul>


        </div>
    );
};

export default LoginForm;