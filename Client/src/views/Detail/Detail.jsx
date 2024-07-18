import style from './Detail.module.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react';
import { getDriverById, resetDetail } from '../../redux/actions';

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const driverDetail = useSelector((state) => state.driverDetail)

    const [showInfo, setShowInfo] = useState(true);

    useEffect(() => {
        dispatch(getDriverById(id));
        return () => {
            dispatch(resetDetail());
        }
    }, [id])

    const handleInfoClick = () => {
        setShowInfo(true);
    };

    const handleDescriptionClick = () => {
        setShowInfo(false);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={style.container}>
            {driverDetail
                .map((driver) => {
                    return (
                        <div className={style.content}>
                            <h1 className={style.title}>DRIVER DETAIL</h1>

                            {/* Mobile */}
                            <div className={style.mainContentMobile}>
                                <div className={style.firstSection}>
                                    <div className={style.nameContainer}>
                                        <h2 className={style.name}>{driver.name}</h2>
                                        <h2 className={style.surname}>{driver.surname}</h2>
                                        <div className={style.divider}></div>
                                    </div>
                                    <div className={style.imgContainer}>
                                        <img className={style.img} src={driver.image} alt="" />
                                        <button className={style.closeButton} onClick={handleGoBack}>
                                            <svg className={style.svg} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className={style.sectionData}>
                                    <div className={style.descriptionContainer}>
                                        <button className={style.button} onClick={handleInfoClick}>Info</button>
                                        <button className={style.button} onClick={handleDescriptionClick}>Description</button>
                                    </div>
                                    <div className={style.show}>
                                        {showInfo ? (
                                            <div className={style.showInfo}>
                                                <p> Nationality {'>'} {driver.nationality}</p>
                                                <p> Birthdate {'>'} {driver.dob}</p>
                                                <p> Teams {'>'} {driver.teams}</p>
                                            </div>
                                        ) : (
                                            <div className={style.showDescription}>
                                                <p>{driver.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Desktop */}
                            <div className={style.mainContentDesktop}>
                                <div className={style.firstSection}>
                                    <div className={style.nameContainer}>
                                        <h2 className={style.name}>{driver.name}</h2>
                                        <h2 className={style.surname}>{driver.surname}</h2>
                                        <div className={style.divider}></div>
                                    </div>
                                    <div className={style.descriptionContainer}>
                                        <button className={style.button} onClick={handleInfoClick}>Info</button>
                                        <button className={style.button} onClick={handleDescriptionClick}>Description</button>
                                    </div>
                                    <div className={style.show}>
                                        {showInfo ? (
                                            <div className={style.showInfo}>
                                                <p> Nationality {'>'} {driver.nationality}</p>
                                                <p> Birthdate {'>'} {driver.dob}</p>
                                                <p> Teams {'>'} {driver.teams}</p>
                                            </div>
                                        ) : (
                                            <div className={style.showDescription}>
                                                <p>{driver.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={style.sectionData}>
                                    <div className={style.imgContainer}>
                                        <img className={style.img} src={driver.image} alt="" />
                                        <button className={style.closeButton} onClick={handleGoBack}>
                                            <svg className={style.svg} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" viewBox="0 0 24 24">
                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Detail;