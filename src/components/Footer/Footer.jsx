import './Footer.css';
import {Link} from "react-router-dom";
import {LINKS} from "../../config/constant";

function Footer() {
    return (
        <footer className={`footer`}>
            <p className={"footer__text"}>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className={"footer__bottom"}>
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                <ul className={"footer__links"}>
                    <li className={"footer__link-line"}>
                        <Link target='_blank' className={"bnt footer__link"}
                              to={LINKS.practicum}>Яндекс.Практикум</Link>
                    </li>
                    <li className={"footer__link-line"}>
                        <Link target='_blank' className={"bnt footer__link"} to={LINKS.gitHub}>Github</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
