import classNames from 'classnames/bind';
import styles from './CloseBtn.module.scss';
import { IconClose } from '../Icons/Icons';

const cx = classNames.bind(styles);


function CloseBtn({onClick, className}) {
    return (
        <div className={cx('close-btn', className)} onClick={onClick}>
            <IconClose width={20} height={20} />
        </div>
    );
}

export default CloseBtn;
