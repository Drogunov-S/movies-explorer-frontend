import './Portfolio.css';
import arrow from "../../images/arrow.svg";

function Portfolio() {
    return (
        <div className="portfolio">
            <h3 className={"portfolio__title"}>Портфолио</h3>
            <ul className={"portfolio__list"}>
                <li className={"portfolio__list-item"}>
                    <p className={"portfolio__link-text"}>Статичный сайт</p>
                    <img src={arrow} alt={"Стрелка"} className={"portfolio__arrow"}/>
                </li>
                <li className={"portfolio__list-item"}>
                    <p className={"portfolio__link-text"}>Адаптивный сайт</p>
                    <img src={arrow} alt={"Стрелка"} className={"portfolio__arrow"}/>
                </li>
                <li className={"portfolio__list-item"}>
                    <p className={"portfolio__link-text"}>Одностраничное приложение</p>
                    <img src={arrow} alt={"Стрелка"} className={"portfolio__arrow"}/>
                </li>
            </ul>
        </div>
    );
}

export default Portfolio;
