import classnames from 'classnames/bind';
import styles from './Header.module.scss';
import React, { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { IconBrand, IconLogOut } from '../Icons/Icons';
import Button from '../Button';
import Modal from '../Modal';
import InputForm from '../InputForm';
import { imgs } from '~/assets/imgs';
import { toast } from 'react-toastify';
import routes from '~/configs/routes';
import AuthenContext from '~/context/AuthenContext';

const cx = classnames.bind(styles);

function Header() {
    const authCtx = React.useContext(AuthenContext);
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const handleShowLoginModal = () => {
        setModalType('login');
        setShowModal(true);
    };

    const handleShowRegisterModal = () => {
        setModalType('register');
        setShowModal(true);
    };

    const handleCloseModal = React.useCallback(() => {
        setShowModal(false);
    }, []);

    return (
        <div className={cx('header')}>
            <div className={cx('grid', 'header__container')}>
                <div className={cx('header__content')}>
                    <Link to={routes.home} className={cx('logo')}>
                        <IconBrand className={cx('logo-img')} />
                        <h3>HMTerest</h3>
                    </Link>
                    {authCtx.isLogin ? (
                        <div className={cx('actions')}>
                            <Button
                                title="Upload"
                                type="link"
                                to={routes.upload}
                                className={cx('button', 'button--primary')}
                            />
                            <Tippy
                                placement="bottom-end"
                                interactive
                                render={(attrs) => (
                                    <div className={cx('menu')} tabIndex="-1" {...attrs}>
                                        <div className={cx('menu__heading')}>
                                            <div className={cx('menu__avatar')}>
                                                <img
                                                    src={imgs.defaultAvatar}
                                                    alt="default avatar"
                                                    className={cx('avatar__img')}
                                                />
                                            </div>
                                            <h4 className={cx('menu__name')}>{authCtx.userInfo ? authCtx.userInfo.username : ''}</h4>
                                        </div>
                                        <div className={cx('menu__body')}>
                                            <div className={cx('menu__item')}>
                                                <button
                                                    className={cx('menu__btn')}
                                                    onClick={() => {
                                                        authCtx.deleteToken()
                                                        authCtx.deleteUserInfo()
                                                        navigate('/', { replace: true })
                                                        toast.success('Logout sucessful!', {
                                                            position: toast.POSITION.BOTTOM_CENTER,
                                                        });
                                                    }}
                                                >
                                                    <p className={cx('menu__label')}>Log out</p>
                                                    <div className={cx('menu__icon')}>
                                                        <IconLogOut width="24px" height="24px" />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            >
                                <div className={cx('avatar')}>
                                    <img src={imgs.defaultAvatar} alt="default avatar" className={cx('avatar__img')} />
                                </div>
                            </Tippy>
                        </div>
                    ) : (
                        <div className={cx('actions')}>
                            <Button
                                title="Log in"
                                type="button"
                                className={cx('button', 'button--primary')}
                                onClick={handleShowLoginModal}
                            />
                            <Button
                                title="Register"
                                type="button"
                                className={cx('button')}
                                onClick={handleShowRegisterModal}
                            />
                        </div>
                    )}
                    {showModal && (
                        <Modal onClick={handleCloseModal}>
                            <InputForm type={modalType} onClick={handleCloseModal} />
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
