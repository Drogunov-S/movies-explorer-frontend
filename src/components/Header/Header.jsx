import './Header.css';
import NavTab from "../NavTab/NavTab";
import logo from './../../images/logos/logo.svg';
import {Link, useLocation} from "react-router-dom";

function Header() {
    const pathname = useLocation().pathname;
    const isLanding = pathname === '/';


    return (
        <header className={`header ${isLanding && 'header_main'}`}>
            <Link to={'/'} >
                <img className="logo header__logo"
                     alt={"Логотип"}
                     src={logo}
                />
            </Link>
            <NavTab/>
        </header>
    );
}

export default Header;
