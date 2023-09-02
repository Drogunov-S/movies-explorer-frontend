import React from 'react';
import {Navigate} from "react-router-dom";
import {CurrentUserContext} from "../../context/CurrentUserContext";


const ProtectedRouteElement = ({element: Component, ...props}) => {
    const loggedUser = React.useContext(CurrentUserContext);
    return (
        loggedUser.isAuth
            ? <Component {...props} />
            : <Navigate to={'/'}/>
    )
}

export default ProtectedRouteElement;
