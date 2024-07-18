import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
    const { onClose } = props;

    return (
        <>
            <div className={style.container} style={{ backgroundColor: props.backgroundColor }}>
                <div className={style.mainContent}>
                    <img src={props.image} alt="" className={style.driverImage} />
                    <Link to={`/detail/${props.id}`} className={style.link}>
                        <h1 className={style.driverName}>{props.name} <br /> {props.surname}</h1>
                    </Link>
                    {isNaN(props.id) && (
                    <button className={style.deleteButton} onClick={() => onClose(props.id)}>DELETE</button>
                )}
                </div>
                <div className={style.nationalityContent}>
                    <h2 className={style.nationalityTitle}>{props.nationality}</h2>
                </div>
            </div>
        </>
    )
}

export default Card;