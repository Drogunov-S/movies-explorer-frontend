import './Portfolio.css';
import arrow from "../../../../images/arrow.svg";
import {Link} from "react-router-dom";
import {LINKS} from "../../../../config/constant";

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className={"portfolio__title"}>Портфолио</h2>
            <ul className={"portfolio__list"}>
                <li className={"portfolio__list-item"}>
                    <Link target='_blank' className={'bnt portfolio__link'}
                          to={LINKS.portfolio.staticSite}>
                        <p className={"portfolio__link-text"}>Статичный сайт</p>
                        <img src={arrow} alt={"Стрелка"} className={"portfolio__arrow"}/>
                    </Link>
                </li>
                <li className={"portfolio__list-item"}>
                    <Link target='_blank' className={'bnt portfolio__link'}
                          to={LINKS.portfolio.adaptiveSite}

                    >
                        <p className={"portfolio__link-text"}>Адаптивный сайт</p>
                        <img src={arrow} alt={"Стрелка"} className={"portfolio__arrow"}/>
                    </Link>
                </li>
                <li className={"portfolio__list-item"}>
                    <Link target='_blank' className={'bnt portfolio__link'}
                          to={LINKS.portfolio.srp}>
                        <p className={"portfolio__link-text"}>Одностраничное приложение</p>
                        <img src={arrow} alt={"Стрелка"} className={"portfolio__arrow"}/>
                    </Link>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
