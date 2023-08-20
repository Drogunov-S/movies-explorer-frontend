import './Main.css';
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Navigation from "../Navigation/Navigation";

function Main() {


    return (
        <div className="main">
            <Promo/>
            <Navigation/>
            <AboutProject/>
            <Techs />
            <AboutMe />
            <Portfolio/>
        </div>
    );
}

export default Main;
