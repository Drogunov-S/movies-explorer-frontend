import './Preloader.css'
import React from 'react'

function Preloader({state, message}) {
    const messageClass = (state === 2) ? `preloader__container_message` : '';
    const hiddenClass = (state === 2) ? 'preloader__round_hidden' : '';
    return (
        <div className="preloader">
            <div className={`preloader__container ${messageClass}`}>
                {state === 2 && <span className={'preloader__message'}>{message}</span>}
                <span className={`preloader__round ${hiddenClass}`}></span>
            </div>
        </div>
    )
};

export default Preloader
