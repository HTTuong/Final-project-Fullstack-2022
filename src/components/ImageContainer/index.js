import classNames from 'classnames/bind';
import styles from './ImageContainer.module.scss';
import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ImageCard from '../ImageCard';
import Modal from '../Modal';
import ImageFullScreen from '../ImageFullScreen';
import Loading from '../Loading';
import postService from '~/hooks/services/posts';
import { OPTIONS } from '../UploadForm';


const TAG_OPTIONS = [
    {
        title: 'All',
        value: ''
    },
    ...OPTIONS
]

const cx = classNames.bind(styles);

function ImageContainer() {
    const { reponseValue, run } = postService.getPosts();
    const [selectedOption, setSelectedOption] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [images, setImages] = useState([]);


    const handleShowModal = () => {
        setShowModal(prev => !prev);
    };

    const [fullSizeImage, setFullSizeImage] = useState({
        src: '',
        alt: '',
    });

    const fetchImages = React.useCallback(async () => {
        run({
            callbackAfterSuccess: (response) => {
                setImages(response.data)
            }
        }, selectedOption)
    }, [run, selectedOption])

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);


    const handleshowImage = (image) => {
        setFullSizeImage({ src: image.url, alt: image.alt });
        handleShowModal();
    };

    return (
        <div className={cx('container')}>
            <div className={cx('option-section')}>
                {TAG_OPTIONS.map(option =>
                    <div key={option.value} className={cx('option', { active: selectedOption === option.value })} onClick={() => setSelectedOption(option.value)}>
                        {option.title}
                    </div>)}
            </div>
            {!reponseValue.isLoading ? (
                <ResponsiveMasonry columnsCountBreakPoints={{ 740: 1, 750: 2, 900: 4 }}>
                    <Masonry gutter="20px">
                        {images.map((image) => {
                            return (
                                <ImageCard
                                    key={image.id}
                                    onClick={() => handleshowImage(image)}
                                    src={image.url}
                                    alt={image.alt}
                                    author={image.name}
                                />
                            );
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            ) : (
                <Loading width="36px" height="36px" className={cx('loading')} />
            )}

            {showModal && (
                <Modal onClick={handleShowModal}>
                    <ImageFullScreen
                        src={
                            fullSizeImage
                                ? fullSizeImage.src
                                : 'https://cdn.osxdaily.com/wp-content/uploads/2021/06/windows-11-wallpaper-23-scaled.jpg'
                        }
                        alt={fullSizeImage ? fullSizeImage.alt : 'sieu nhan'}
                        onClick={handleShowModal}
                    />
                </Modal>
            )}
        </div>
    );
}

export default ImageContainer;
