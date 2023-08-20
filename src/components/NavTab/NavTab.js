import './NavTab.css';
import account from './../../images/account.svg';
import {NavLink} from "react-router-dom";
import {useState} from "react";

function NavTab({isLogin}) {
    const [isActiveMenu, setMenuActive] = useState(false);
    const handleActiveMenu = () => {
        setMenuActive(!isActiveMenu);
    }

    return (
        <nav className="navtab">
            {isLogin ? (
                <>
                    <button className="navtab__link navtab__menu" onClick={handleActiveMenu}/>
                    <div className={`${isActiveMenu ? 'navtab__wrapper_active' : 'navtab__wrapper_disable'}`}
                    // onClick={handleActiveMenu}
                    >
                        <ul className={"navtab__list navtab__link_"}>
                            {isActiveMenu && (
                                <>
                                    <button className={'navtab__close-menu'} onClick={handleActiveMenu}/>
                                    <li className={'navtab__item'}>
                                        <NavLink className={`navtab__link ${isLogin && 'navtab__link_login'}`} to="/">Главная</NavLink>
                                    </li>
                                </>)}
                            <li className={'navtab__item'}>
                                <NavLink className={`navtab__link ${isLogin && 'navtab__link_login'}`} to="/movies">Фильмы</NavLink>
                            </li>
                            <li className={'navtab__item'}>
                                <NavLink className={`navtab__link ${isLogin && 'navtab__link_login'}`} to="/saved-movies">Сохраненные фильмы</NavLink>
                            </li>
                            <li className={'navtab__item'}>
                                <NavLink className={"navtab__link navtab__link_type_account"} to="/profile">
                                    Аккаунт<img className={"navtab__link__account-logo"} alt={'Аккаунт'} src={account}/>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <NavLink reloadDocument className={"navtab__link navtab__link_type_landing"}
                             to="/sign-up">Регистрация</NavLink>
                    <NavLink reloadDocument className={"navtab__link navtab__link_type_landing navtab__link_type_login"}
                             to="/sign-in">Войти</NavLink>
                </>)
            }
        </nav>
    );
}

export default NavTab;
