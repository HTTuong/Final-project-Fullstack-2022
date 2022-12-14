import classNames from 'classnames/bind';
import styles from './ImageFullScreen.module.scss';
import CloseBtn from '../CloseBtn';

const cx = classNames.bind(styles);

function ImageFullScreen({ src, alt, onClick, className }) {
    const classes = ['container', className];
    return (
        <div className={cx(classes)}>
            <div className={cx('content')}>
                <img src={src} alt={alt} className={cx('img')} />
            </div>
            <CloseBtn onClick={onClick} className={cx('close-btn')} />
        </div>
    );
}

export default ImageFullScreen;
