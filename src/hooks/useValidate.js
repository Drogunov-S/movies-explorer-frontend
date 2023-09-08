import {useContext, useEffect, useState} from "react";
import {isEmail, isEqualCurrentUserData, isName} from "../utils/utility";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {MESSAGES} from "../config/constant";

export function useValidate(form, inputs) {
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setValid] = useState({});
    const [isFormValid, setFormValid] = useState(false);
    const currentUser = useContext(CurrentUserContext);


    useEffect(() => {
        if (inputs) {
            setErrors({});
            setValid({});
            setFields({});
            inputs.forEach(input => {
                setValid({...isValid, [input.name]: false});
            })
        }
    }, []);

    const handleValidation = (e) => {
        const {name, value, validity: {valid}} = e.target;

        let message = e.target.validationMessage;
        if (name === 'email' && !isEmail(value)) {
            message = message ? message : MESSAGES.errValidEmail;
            setValid({...isValid, [name]: false});
            setErrors({...errors, [name]: message});
        } else if (name === 'name' && !isName(value)) {
            message = message ? message : MESSAGES.errValidName;
            setValid({...isValid, [name]: false});
            setErrors({...errors, [name]: message});
        } else if (form === 'profile'
            && Object.keys(fields).length > 0
            && !isEqualCurrentUserData({...fields, [name]: value}, {
                name: currentUser.name,
                email: currentUser.email
            })) {
            Object.keys(errors).forEach(key => {
                    if (key === 'email' && !isEmail(fields[key])) {
                        message = message ? message : MESSAGES.errValidEmail;
                        setValid({...isValid, [key]: false});
                        setErrors({...errors, [key]: message});
                    } else if (key === 'name' && !isName(fields[key])) {
                        message = message ? message : MESSAGES.errValidName;
                        setValid({...isValid, [key]: false});
                        setErrors({...errors, [key]: message});
                    } else {
                        setErrors({...errors, [key]: ''});
                        setValid({...isValid, [key]: true});
                    }
                }
            )
        } else if (form === 'profile' && currentUser[name] === value) {
            message = message ? message : MESSAGES.errValidEqualsData;
            setValid({...isValid, [name]: false});
            setErrors({...errors, [name]: message});
        } else {
            setErrors({...errors, [name]: e.target.validationMessage});
            setValid({...isValid, [name]: valid});
        }

        setFields({...fields, [name]: value});
    }

    useEffect(() => {
        if (Object.values(isValid).length === 0) {
            setFormValid(false);
        } else if (!Object.values(isValid).includes(false)) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [isValid]);

    return {
        handleValidation
        , errors
        , isFormValid
        , fields
    }
}
