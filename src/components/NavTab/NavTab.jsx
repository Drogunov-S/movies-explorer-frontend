import './NavTab.css';
import account from './../../images/account.svg';
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import {ROUTES} from "../../config/constant";

function NavTab() {
    const [isActiveMenu, setMenuActive] = useState(false);
    const {isAuth} = useContext(CurrentUserContext);
    const handleActiveMenu = () => {
        setMenuActive(!isActiveMenu);
    }

    return (
        <nav className="navtab">
            {isAuth ? (
                <>
                    <button className="navtab__link navtab__menu" onClick={handleActiveMenu}/>
                    <div
                        className={`navtab__wrapper ${isActiveMenu ? 'navtab__wrapper_active' : 'navtab__wrapper_disable'}`}
                    >
                        <ul className={"navtab__list navtab__link_"}>
                            {isActiveMenu && (
                                <>
                                    <button className={'navtab__close-menu'} onClick={handleActiveMenu}/>
                                    <li className={'navtab__item'}>
                                        <NavLink className={`bnt navtab__link ${isAuth && 'navtab__link_login'}`}
                                                 to={ROUTES.main}>Главная</NavLink>
                                    </li>
                                </>)}
                            <li className={'navtab__item'}>
                                <NavLink className={`bnt navtab__link ${isAuth && 'navtab__link_login'}`}
                                         to={ROUTES.movies}>Фильмы</NavLink>
                            </li>
                            <li className={'navtab__item'}>
                                <NavLink className={`bnt navtab__link ${isAuth && 'navtab__link_login'}`}
                                         to={ROUTES.savedMovies}>Сохраненные фильмы</NavLink>
                            </li>
                            <li className={'navtab__item'}>
                                <NavLink
                                    className={"bnt navtab__link navtab__link_type_account"}
                                    to={ROUTES.profile}>
                                    Аккаунт<img className={"navtab__link__account-logo"} alt={'Аккаунт'} src={account}/>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <NavLink className={"bnt navtab__link navtab__link_type_landing"}
                             to={ROUTES.signup}>Регистрация</NavLink>
                    <NavLink className={"bnt navtab__link navtab__link_type_landing navtab__link_type_login"}
                             to={ROUTES.signin}>Войти</NavLink>
                </>)
            }
        </nav>
    );
}

export default NavTab;
