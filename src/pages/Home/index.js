import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ImageContainer from '~/components/ImageContainer';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('container')}>
            <ImageContainer />
        </div>
    );
}

export default Home;
