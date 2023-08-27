import './Footer.css';
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className={`footer`}>
            <p className={"footer__text"}>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className={"footer__bottom"}>
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                <ul className={"footer__links"}>
                    <li className={"footer__link-line"}>
                        <Link target='_blank' className={"bnt footer__link"} to={"https://practicum.yandex.ru/"}>Яндекс.Практикум</Link>
                    </li>
                    <li className={"footer__link-line"}>
                        <Link target='_blank' className={"bnt footer__link"} to={"https://github.com/Drogunov-S"}>Github</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
