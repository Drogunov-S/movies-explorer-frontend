import './Navigation.css';
import {Link} from "react-router-dom";
import {ELEMENT_NAME_ABOUT_ME, ELEMENT_NAME_ABOUT_PROJECT, ELEMENT_NAME_TECHS} from "../../../../config/constant";

function Navigation() {
  return (
    <section className="navigation">
        <Link to={`#${ELEMENT_NAME_ABOUT_PROJECT}`} reloadDocument className="bnt navigation__link">О проекте</Link>
        <Link to={`#${ELEMENT_NAME_TECHS}`} reloadDocument className="bnt navigation__link">Технологии</Link>
        <Link to={`#${ELEMENT_NAME_ABOUT_ME}`} reloadDocument className="bnt navigation__link">Студент</Link>
    </section>
  );
}

export default Navigation;
