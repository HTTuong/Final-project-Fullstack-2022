import classNames from 'classnames/bind';
import styles from './ImageCard.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ImageCard({
    onClick,
    className,
    src = 'https://cdn.osxdaily.com/wp-content/uploads/2021/06/windows-11-wallpaper-23-scaled.jpg',
    alt = '',
    author = 'Unknown',
    onLoad,
    ...params
}) {
    const [loaded, setLoaded] = useState(false);
    const styles = [className, 'container'];

    return (
        <div className={cx(styles)} style={loaded ? {} : { display: 'none' }} {...params}>
            <div className={cx('img-container')} onClick={onClick}>
                <img
                    src={src}
                    alt={alt}
                    className={cx('img')}
                    onLoad={() => {
                        setLoaded(true);
                    }}
                />
            </div>
            <div className={cx('desc')}>
                <p className={cx('author')}>{author}</p>
            </div>
        </div>
    );
}

export default ImageCard;
