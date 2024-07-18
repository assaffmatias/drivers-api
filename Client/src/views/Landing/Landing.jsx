import style from './Landing.module.css';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import image from '../../assets/landing.jpg'

const Landing = () => {

    const scrollTop = () => {
        window.scrollTo(0, 0)
    };

    const email = 'matias.assaff98@gmail.com'
    const url = `mailto:${email}`

    return (
        <div className={style.container}>
            <div className={style.mainContent}>
                <div className={style.imageSection}>
                    <img src={image} alt="" className={style.img}/>
                </div>
                <div className={style.content}>
                    <img src={logo} alt="" className={style.logo} />
                    <h2 className={style.titleLogo}>
                        <span className={style.titleDrivers}>DRIVERS</span>
                        <span className={style.titleApi}>API</span>
                    </h2>
                    <div className={style.buttonContainer}>
                        <Link to={'/drivers'}>
                            <button className={style.welcomeButton}>WELCOME</button>
                        </Link>
                        <Link to={'/create'}>
                            <button className={style.aboutButton}>CREATE</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;