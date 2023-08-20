import './Header.css';
import NavTab from "../NavTab/NavTab";
import logo from './../../images/logos/logo.svg';
import {Link, useLocation} from "react-router-dom";

function Header({isLogin, handlerLoginState}) {

    const pathname = useLocation().pathname;
    const isLanding = pathname === '/';
    const handlerLogin = () => {
        // console.log(isLogin)
        handlerLoginState(isLogin);
    }


    return (
        <div className={`header ${isLanding && 'header_main'}`}>
            <Link to={'/'} onClick={handlerLogin}>
                <img className="logo header__logo"
                     alt={"Логотип"}
                     src={logo}
                />
            </Link>
            <NavTab isLogin={isLogin}/>
        </div>
    );
}

export default Header;
