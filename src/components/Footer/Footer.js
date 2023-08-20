import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <p className={"footer__text"}>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className={"footer__bottom"}>
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                <ul className={"footer__links"}>
                    <li className={"footer__link-line"}>
                        <a className={"footer__link"} href={"#"}>Яндекс.Практикум</a>
                    </li>
                    <li className={"footer__link-line"}>
                        <a className={"footer__link"} href={"#"}>Github</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
