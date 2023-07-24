import './Main.css';
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main() {
    return (
        <div className="">
            Main start
            <Promo/>
            <NavTab/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
            Main end
        </div>
    );
}

export default Main;
