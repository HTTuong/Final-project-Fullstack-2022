
import classNames from 'classnames/bind';
import styles from './InputForm.module.scss';
import React, { useState, useEffect } from 'react';
import AuthenContext from '~/context/AuthenContext';
import { IconBrand } from '../Icons/Icons';
import CloseBtn from '../CloseBtn';
import validator from '~/services/validate';
import Loading from '../Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from '~/hooks/services/auth';


const cx = classNames.bind(styles);

function InputForm({ type = 'login', onClick }) {

    const authCtx = React.useContext(AuthenContext);

    const { reponseValue: reponseSignInValue, run: runSignIn } = authService.signIn()
    const { reponseValue: reponseSignUpValue, run: runSignUp } = authService.signUp()

    console.log(reponseSignInValue.error)

    const [firstName, setFirstName] = useState('');
    const [isValidFirstName, setIsValidFirstName] = useState(false);

    const [username, setUserName] = useState('');
    const [isValidUserName, setIsValidUserName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [isValidLastName, setIsValidLastName] = useState(false);

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (type === 'login') {
            setIsValid(isValidEmail && isValidPassword);
        } else {
            setIsValid(isValidFirstName && isValidLastName && isValidUserName && isValidEmail && isValidPassword);
        }
    }, [isValidFirstName, isValidLastName, isValidUserName, isValidEmail, isValidPassword, type]);

    React.useLayoutEffect(() => {
        if (reponseSignInValue.error || reponseSignUpValue.error) {
            const signInErrorMessage = reponseSignInValue.error && 'Oops, something went wrong. Please sign up or try another email'
            const signUpErrorMessage = reponseSignUpValue.error && 'Oops, something went wrong. Try another username or email'
            const errorMessage = signInErrorMessage || signUpErrorMessage
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    }, [reponseSignInValue.error, reponseSignUpValue.error])

    const handleValidate = (setter, rules) => {
        const isValidValue = validator({
            errForm: cx('form-item__error-msg'),
            rules,
        });

        setter(isValidValue);
    };

    const handleDisplayToastMessage = React.useCallback((response) => {
        if (response.error) {
            toast.error(response.error.message, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } else {
            toast.success(`${type[0].toUpperCase() + type.slice(1)} Sucessful!`, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            onClick();
        }
    }, [onClick, type])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;

        if (type === 'login') {
            const requestBody = {
                email,
                password
            }
            runSignIn({
                body: requestBody,
                headers: {
                    'Content-Type': 'application/json'
                },
                callbackAfterSuccess: (response) => {
                    if (reponseSignInValue.error) {
                        console.log("Error: ", reponseSignInValue.error)
                        return;
                    }
                    const token = response.data.token;
                    const tokenType = response.data.type;
                    const userInfo = {
                        id: response.data.id.toString(),
                        username: response.data.username,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        role: response.data.role,
                    }
                    handleDisplayToastMessage(response);
                    authCtx.addToken(token, tokenType);
                    authCtx.addUserInfo(userInfo);
                }
            })
        } else {
            const requestBody = {
                firstName,
                lastName,
                username,
                email,
                password
            }

            runSignUp({
                body: requestBody,
                headers: {
                    'Content-Type': 'application/json'
                },
                callbackAfterSuccess: handleDisplayToastMessage
            })
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('heading')}>
                <div className={cx('logo')}>
                    <IconBrand className={cx('logo-img')} />
                    <h3>{type === 'login' ? 'Login' : 'Register'}</h3>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={cx('form')} id="submit-form">
                {!(type === 'login') && (
                    <div className={cx('form-item')}>
                        <label htmlFor="firstName" className={cx('form-item__label')}>
                            First Name
                        </label>
                        <input
                            className={cx('form-item__input')}
                            id="first-name"
                            name="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => {
                                handleValidate(setIsValidFirstName, [validator.isRequired(e.target)]);
                                setFirstName(e.target.value);
                            }}
                            onFocus={(e) => handleValidate(setIsValidFirstName, [validator.isRequired(e.target)])}
                        />
                        <p className={cx('form-item__error-msg')}></p>
                    </div>
                )}
                {!(type === 'login') && (
                    <div className={cx('form-item')}>
                        <label htmlFor="lastName" className={cx('form-item__label')}>
                            Last Name
                        </label>
                        <input
                            className={cx('form-item__input')}
                            id="last-name"
                            name="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => {
                                handleValidate(setIsValidLastName, [validator.isRequired(e.target)]);
                                setLastName(e.target.value);
                            }}
                            onFocus={(e) => handleValidate(setIsValidLastName, [validator.isRequired(e.target)])}
                        />
                        <p className={cx('form-item__error-msg')}></p>
                    </div>
                )}
                {!(type === 'login') && (
                    <div className={cx('form-item')}>
                        <label htmlFor="username" className={cx('form-item__label')}>
                            User Name
                        </label>
                        <input
                            className={cx('form-item__input')}
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                handleValidate(setIsValidUserName, [validator.isRequired(e.target)]);
                                setUserName(e.target.value);
                            }}
                            onFocus={(e) => handleValidate(setIsValidUserName, [validator.isRequired(e.target)])}
                        />
                        <p className={cx('form-item__error-msg')}></p>
                    </div>
                )}
                <div className={cx('form-item')}>
                    <label htmlFor="email" className={cx('form-item__label')}>
                        Email
                    </label>
                    <input
                        className={cx('form-item__input')}
                        id="email"
                        name="email"
                        type="text"
                        value={email}
                        onChange={(e) => {
                            handleValidate(setIsValidEmail, [
                                validator.isRequired(e.target),
                                validator.isEmail(e.target),
                            ]);

                            setEmail(e.target.value);
                        }}
                        onFocus={(e) =>
                            handleValidate(setIsValidEmail, [
                                validator.isRequired(e.target),
                                validator.isEmail(e.target),
                            ])
                        }
                    />
                    <p className={cx('form-item__error-msg')}></p>
                </div>
                <div className={cx('form-item')}>
                    <label htmlFor="password" className={cx('form-item__label')}>
                        Password
                    </label>
                    <input
                        className={cx('form-item__input')}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            handleValidate(setIsValidPassword, [
                                validator.isRequired(e.target),
                                validator.exceedMinLength(e.target, 8),
                            ]);
                            setPassword(e.target.value);
                        }}
                        onFocus={(e) =>
                            handleValidate(setIsValidPassword, [
                                validator.isRequired(e.target),
                                validator.exceedMinLength(e.target, 8),
                            ])
                        }
                    />
                    <p className={cx('form-item__error-msg')}></p>
                </div>

                <button disabled={!isValid} type="submit" className={cx('submit-btn')}>
                    <p> {(reponseSignInValue.isLoading || reponseSignUpValue.isLoading) ? <Loading width="16px" height="16px" /> : type.toUpperCase()}</p>
                </button>

            </form>
            <CloseBtn onClick={onClick} className={cx('close-btn')} />
        </div>
    );
}


export default InputForm;
