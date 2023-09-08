import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Navigation from "./Navigation/Navigation";
import Main from "../Main";

function Landing() {
    return (
        <Main>
            <Promo/>
            <Navigation/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
        </Main>
    );
}

export default Landing;
