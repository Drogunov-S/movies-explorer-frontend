import './Preloader.css'
import {PRELOADER_STATES} from "../../../config/constant";

function Preloader({
                       state
                       , message
                   }) {

    const messageClass = (state === PRELOADER_STATES.message) ? `preloader__container_message` : '';
    const hiddenClass = (state === PRELOADER_STATES.message) ? 'preloader__round_hidden' : '';
    return (
        <div className="preloader">
            <div className={`preloader__container ${messageClass}`}>
                {state === PRELOADER_STATES.message && <span className={'preloader__message'}>{message}</span>}
                <span className={`preloader__round ${hiddenClass}`}></span>
            </div>
        </div>
    )
}

export default Preloader
