import './Error.css';
import {Link} from "react-router-dom";
import Main from "../Main";

function Error({code, message, refText}) {
    return (
        <Main>
            <section className="error">
                <h1 className={"error__title"}>{code}</h1>
                <p className={"error__text"}>{message}</p>
                <Link to={-1} className={'error__link'}>{refText}</Link>
            </section>
        </Main>
    );
}

export default Error;
