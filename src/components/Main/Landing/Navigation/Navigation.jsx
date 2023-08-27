import './Navigation.css';
import {Link} from "react-router-dom";

function Navigation({reference}) {
  return (
    <section className="navigation">
      <Link to="#aboutProject" reloadDocument className="bnt navigation__link">О проекте</Link>
      <Link to={"#techs"} reloadDocument className="bnt navigation__link">Технологии</Link>
      <Link to={"#aboutMe"} reloadDocument className="bnt navigation__link">Студент</Link>
    </section>
  );
}

export default Navigation;
