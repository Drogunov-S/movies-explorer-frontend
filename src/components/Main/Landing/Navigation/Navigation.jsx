import './Navigation.css';
import {Link} from "react-router-dom";
import {ELEMENTS_NAME} from "../../../../config/constant";

function Navigation() {
    return (
        <section className="navigation">
            <Link to={`#${ELEMENTS_NAME.aboutProject}`} reloadDocument className="bnt navigation__link">О проекте</Link>
            <Link to={`#${ELEMENTS_NAME.techs}`} reloadDocument className="bnt navigation__link">Технологии</Link>
            <Link to={`#${ELEMENTS_NAME.aboutMe}`} reloadDocument className="bnt navigation__link">Студент</Link>
        </section>
    );
}

export default Navigation;
