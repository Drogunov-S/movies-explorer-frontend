import './AboutMe.css';
import defaultImg from '../../../../images/img.png'
import {Link} from "react-router-dom";

function AboutMe() {
    return (
        <section className="about-me" id={"aboutMe"}>
            <h2 className={"about-me__title"}>Студент</h2>
            <div className={"about-me__info"}>
                <div className={"about-me__data"}>
                    <h3 className={"about-me__name"}>Виталий</h3>
                    <h4 className={"about-me__position"}>Фронтенд-разработчик, 30 лет</h4>
                    <p className={"about-me__text"}>Я родился и живу в Саратове, закончил факультет экономики СГУ. У
                        меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
                        в
                        компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
                        фриланс-заказами
                        и ушёл с постоянной работы.</p>
                    <ul className={"about-me__links"}>
                        <li className={"about-me__line"}>
                            <Link className={"bnt about-me__link"} to={"https://github.com/Drogunov-S"}>GitHub</Link>
                        </li>
                    </ul>
                </div>
                <img className={"about-me__photo"} alt={'Фотография автора'} src={defaultImg}/>
            </div>
        </section>
    );
}

export default AboutMe;
