import './Footer.css';
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className="footer">
            <p className={"footer__text"}>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className={"footer__bottom"}>
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                <ul className={"footer__links"}>
                    <li className={"footer__link-line"}>
                        <Link className={"footer__link"} to={"https://practicum.yandex.ru/"}>Яндекс.Практикум</Link>
                    </li>
                    <li className={"footer__link-line"}>
                        <Link className={"footer__link"} to={"https://github.com/Drogunov-S"}>Github</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
