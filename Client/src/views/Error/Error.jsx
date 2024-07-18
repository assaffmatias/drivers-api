import style from './Error.module.css'
import { Link } from 'react-router-dom'
import PATHROUTES from '../../helpers/PathRoutes'

const Error = () => {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <p className={style.p}>ERROR: 404</p>
                <h1 className={style.h1}>PAGE NOT FOUND</h1>
                <Link to={PATHROUTES.HOME}>
                    <button className={style.button}>RETURN HOME</button>
                </Link>
            </div>
        </div>
    )
}

export default Error;