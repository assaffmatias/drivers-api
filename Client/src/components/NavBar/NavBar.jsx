import { Link, useLocation, useParams} from 'react-router-dom';
import PATHROUTES from '../../helpers/PathRoutes';
import style from './NavBar.module.css'
import logo from '../../assets/logo.png'
import SearchBar from '../SearchBar/SearchBar'

const NavBar = ({ onSearch }) => {
    const location = useLocation();
    const {id} = useParams()

    if (!Object.values(PATHROUTES).includes(location.pathname)) {
        return null;
    }

    if (location.pathname.includes(`/detail`)) {
        return null;
    }

    if(location.pathname === PATHROUTES.HOME) {
        return null
    }

    return (
        <div className={style.container}>
            <div className={style.logoContainer}>
                <Link to={PATHROUTES.HOME}>
                    <img src={logo} alt="" className={style.logo} />
                </Link>
                <Link className={style.link} to={PATHROUTES.DRIVERS}>DRIVERS</Link>
                <Link className={style.link} to={PATHROUTES.CREATE}>CREATE</Link>
            </div>
            <SearchBar onSearch={onSearch}></SearchBar>
        </div>
    )
}

export default NavBar;