import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { IconLoading } from '../Icons/Icons';

const cx = classNames.bind(styles);

function Loading({width, height, className}) {

    const styles = ['loading', className]
    return <IconLoading className={cx(styles)} width={width} height={height} />;
}

export default Loading;
