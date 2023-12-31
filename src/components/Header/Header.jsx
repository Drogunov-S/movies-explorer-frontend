import './Header.css';
import NavTab from "../NavTab/NavTab";
import logo from './../../images/logos/logo.svg';
import {Link} from "react-router-dom";
import {getPageName} from "../../utils/utility";
import {ROUTES} from "../../config/constant";

function Header() {
    return (
        <header className={`header header_${getPageName()}`}>
            <Link to={ROUTES.main} className={'bnt'}>
                <img className={`header__logo header__logo_${getPageName()}`}
                     alt={"Логотип"}
                     src={logo}
                />
            </Link>
            <NavTab/>
        </header>
    );
}

export default Header;
