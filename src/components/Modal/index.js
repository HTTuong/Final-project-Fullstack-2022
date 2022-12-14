import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ onClick, children }) {
    return (
        <div className={cx('wrapper')}>
            {children}
            <div className={cx('overlay')} onClick={onClick}></div>
        </div>
    );
}

export default Modal;
