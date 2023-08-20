import './Error.css';
import {Link} from "react-router-dom";

function Error({code, message, link, refText}) {
    return (
        <div className="error">
            <div className={"error__container"}>
                <h1 className={"error__title"}>{code}</h1>
                <p className={"error__text"}>{message}</p>
            </div>
            <Link to={link} reloadDocument className={'error__link'}>{refText}</Link>
        </div>
    );
}

export default Error;
