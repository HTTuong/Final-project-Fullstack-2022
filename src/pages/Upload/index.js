import classNames from 'classnames/bind';
import UploadForm from '~/components/UploadForm';
import styles from './Upload.module.scss';

const cx = classNames.bind(styles);

function Upload() {
    return (
        <div className={cx('container')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-o-5')}>
                        <UploadForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;
