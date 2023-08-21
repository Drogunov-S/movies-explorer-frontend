import './Error.css';
import {Link} from "react-router-dom";
import Main from "../Main";

function Error({code, message, link, refText}) {
    return (
        <Main>
            <div className="error">
                <div className={"error__container"}>
                    <h1 className={"error__title"}>{code}</h1>
                    <p className={"error__text"}>{message}</p>
                </div>
                <Link to={link} reloadDocument className={'error__link'}>{refText}</Link>
            </div>
        </Main>
    );
}

export default Error;
