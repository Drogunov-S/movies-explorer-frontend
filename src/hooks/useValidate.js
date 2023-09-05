import {useContext, useEffect, useState} from "react";
import {isEmail, isName} from "../utils/utility";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {MESS_ERR_VALID_EMAIL, MESS_ERR_VALID_EQUALS_DATA, MESS_ERR_VALID_NAME} from "../config/constant";

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
            message = message ? message : MESS_ERR_VALID_EMAIL;
            setValid({...isValid, [name]: false});
            setErrors({...errors, [name]: message});
        } else if (name === 'name' && !isName(value)) {
            message = message ? message : MESS_ERR_VALID_NAME;
            setValid({...isValid, [name]: false});
            setErrors({...errors, name: message});
        } else if (form === 'profile' && currentUser[name] === value) {
            message = message ? message : MESS_ERR_VALID_EQUALS_DATA;
            setValid({...isValid, [name]: false});
            setErrors({...errors, name: message});
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

    return {handleValidation, errors, isFormValid, setFormValid}
}
