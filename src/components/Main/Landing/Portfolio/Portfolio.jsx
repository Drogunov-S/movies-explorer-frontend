import './Portfolio.css';
import arrow from "../../../../images/arrow.svg";
import {Link} from "react-router-dom";

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className={"portfolio__title"}>Портфолио</h2>
            <ul className={"portfolio__list"}>
                <li className={"portfolio__list-item"}>
                    <Link target='_blank' className={'bnt portfolio__link'} to={'https://drogunov-s.github.io/how-to-learn_public/'}>
                        <p className={"portfolio__link-text"}>Статичный сайт</p>
                        <img src={arrow} alt={"Стрелка"} className={"portfolio__arrow"}/>
                    </Link>
                </li>
                <li className={"portfolio__list-item"}>
                    <Link target='_blank' className={'bnt portfolio__link'} to={'https://drogunov-s.github.io/russian-travel-public/'}

                    >
                        <p className={"portfolio__link-text"}>Адаптивный сайт</p>
                        <img src={arrow} alt={"Стрелка"} className={"portfolio__arrow"}/>
                    </Link>
                </li>
                <li className={"portfolio__list-item"}>
                    <Link target='_blank' className={'bnt portfolio__link'} to={'https://drogunov-s.github.io/react-mesto-auth-public/'}>
                        <p className={"portfolio__link-text"}>Одностраничное приложение</p>
                        <img src={arrow} alt={"Стрелка"} className={"portfolio__arrow"}/>
                    </Link>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
