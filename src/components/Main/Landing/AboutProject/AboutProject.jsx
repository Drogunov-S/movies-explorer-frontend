import './AboutProject.css';

function AboutProject() {
    return (
        <section className={"about-project"} id={"aboutProject"}>
            <h2 className={"about-project__title"}>О проекте</h2>
            <ul className={"about-project__about"}>
                <li className={"about-project__list"}>
                    <h3 className={"about-project__subtitle"}>Дипломный проект включал 5 этапов</h3>
                    <p className={"about-project__text"}>Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные
                        доработки.</p>
                </li>
                <li className={"about-project__list"}>
                    <h3 className={"about-project__subtitle"}>На выполнение диплома ушло 5 недель</h3>
                    <p className={"about-project__text"}>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
                        было соблюдать, чтобы успешно
                        защититься.</p>
                </li>
            </ul>
            <div className={"about-project__graf graf"}>
                <div className={"graf__item"}>
                    <div className={"graf__parts graf__part-1"}>
                        <span>1 неделя</span>
                    </div>
                    <span className={"graf__text"}>Back-end</span>
                </div>
                <div className={"graf__item-2"}>
                    <div className={"graf__parts graf__part-2"}>
                        <span>4 недели</span>
                    </div>
                    <span className={"graf__text"}>Front-end</span>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;
