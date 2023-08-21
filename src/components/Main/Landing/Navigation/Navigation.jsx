import './Navigation.css';
import {Link} from "react-router-dom";

function Navigation({reference}) {
  return (
    <div className="navigation">
      <Link to="#aboutProject" reloadDocument className="navigation__link">О проекте</Link>
      <Link to={"#techs"} reloadDocument className="navigation__link">Технологии</Link>
      <Link to={"#aboutMe"} reloadDocument className="navigation__link">Студент</Link>
    </div>
  );
}

export default Navigation;
