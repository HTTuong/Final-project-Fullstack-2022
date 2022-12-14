import { storage, ref, uploadBytesResumable, getDownloadURL } from '~/firebase';
import AuthenContext from '~/context/AuthenContext';
import classNames from 'classnames/bind';
import styles from './UploadForm.module.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseBtn from '../CloseBtn';
import validator from '~/services/validate';
import Loading from '../Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from '~/configs/routes';

import postService from '~/hooks/services/posts';

const cx = classNames.bind(styles);

export const OPTIONS = [
    {
        title: 'Landscape',
        value: 'landscape'
    },
    {
        title: 'Anime',
        value: 'anime'
    },
    {
        title: 'Others',
        value: 'others'
    }
]

function UploadForm({ onClick }) {

    const authCtx = React.useContext(AuthenContext)

    const { reponseValue, run } = postService.postPosts();

    const navigate = useNavigate();
    const [seletedTag, setSelectedTag] = useState('');
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [isValidFile, setIsValidFile] = useState(false);
    const [isValidDescription, setIsValidDescription] = useState(false);
    const [isValid, setIsValid] = useState(false);


    useEffect(() => {
        setIsValid(isValidFile && isValidDescription);
    }, [isValidFile, isValidDescription]);

    const handleValidate = (setter, rules) => {
        const isValidValue = validator({
            errForm: cx('form-item__error-msg'),
            rules,
        });

        setter(isValidValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
            },
            async () => {
                try {
                    let url = await getDownloadURL(uploadTask.snapshot.ref);

                    // Traditional way
                    // let rest = await fetch("http://localhost:8080/api/images", {
                    //     method: 'POST',
                    //     mode: 'cors',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dW9uZzI3MDUwMUB0ZXN0LmNvbSIsImlhdCI6MTY3MTAyNjg1MCwiZXhwIjoxNjcxMTEzMjUwfQ.8XKA1nX73SOacpR5lpwAv2blBF6a1MBtoexoESobppyz7jHEg582vRkzVj_G5PAcbAUk1QEfArjVtZ8rlK-p6g'
                    //     },
                    //     body: JSON.stringify({
                    //         url: url.toString(),
                    //         name: authCtx.userInfo.username,
                    //         description,
                    //         tag: seletedTag
                    //     })
                    // })
                    // rest = await rest.json();

                    // Another way
                    run({
                        body: {
                            url: url.toString(),
                            name: authCtx.userInfo.username,
                            description,
                            tag: seletedTag
                        },
                        headers: {
                            // Accept: 'application/json', // Set output type to JSON.
                            'Content-Type': 'application/json',
                            'Authorization': authCtx.tokenType + " " + authCtx.token
                        },
                        callbackAfterSuccess: (respone) => {
                            console.log(respone)
                            if (respone.status === 200) {
                                toast.success('Upload Successful', {
                                    position: toast.POSITION.BOTTOM_CENTER,
                                });
                                setTimeout(() => {
                                    navigate(routes.home);
                                }, 1000)
                            }
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            },
        );
    };

    return (
        <div className={cx('container')}>
            <div className={cx('heading')}>
                <div className={cx('logo')}>
                    <h3>Upload your photo</h3>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={cx('form')} id="submit-form">
                <div className={cx('form-item')}>
                    <label htmlFor="file" className={cx('form-item__label')}>
                        File
                    </label>
                    <input
                        className={cx('form-item__input')}
                        id="file"
                        name="file"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => {
                            handleValidate(setIsValidFile, [validator.isRequired(e.target)]);
                            setFile(e.target.files[0]);
                        }}
                        onFocus={(e) => handleValidate(setIsValidFile, [validator.isRequired(e.target)])}
                    />
                    <p className={cx('form-item__error-msg')}></p>
                </div>
                <div className={cx('form-item')}>
                    <label htmlFor="tag" className={cx('form-item__label')}>
                        Tag
                    </label>
                    <select
                        style={{ padding: '1rem' }}
                        id="tag"
                        name="tag"
                        defaultValue={'DEFAULT'}
                        onChange={(e) => {
                            setSelectedTag(e.target.value)
                        }}
                    >
                        <option value="DEFAULT" disabled>Select below tags</option>
                        {OPTIONS.map(option => <option key={option.value} value={option.value}>{option.title}</option>)}
                    </select>
                    <p className={cx('form-item__error-msg')}></p>
                </div>
                <div className={cx('form-item')}>
                    <label htmlFor="description" className={cx('form-item__label')}>
                        Description
                    </label>
                    <input
                        className={cx('form-item__input')}
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={(e) => {
                            handleValidate(setIsValidDescription, [validator.isRequired(e.target)]);
                            setDescription(e.target.value);
                        }}
                        onFocus={(e) => handleValidate(setIsValidDescription, [validator.isRequired(e.target)])}
                    />
                    <p className={cx('form-item__error-msg')}></p>
                </div>

                <button disabled={!isValid} type="submit" className={cx('submit-btn')}>
                    <p>{reponseValue.isLoading ? <Loading width="16px" height="16px" /> : 'Upload'}</p>
                </button>
            </form>
            <CloseBtn onClick={onClick} />
        </div>
    );
}

export default UploadForm;
