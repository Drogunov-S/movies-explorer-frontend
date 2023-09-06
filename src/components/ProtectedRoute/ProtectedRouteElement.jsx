import React from 'react';
import {Navigate} from "react-router-dom";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import {ROUTES} from "../../config/constant";


const ProtectedRouteElement = ({element: Component, ...props}) => {
    const {isAuth} = React.useContext(CurrentUserContext);
    return (
        isAuth
            ? <Component {...props} />
            : <Navigate to={ROUTES.main}/>
    )
}

export default ProtectedRouteElement;
