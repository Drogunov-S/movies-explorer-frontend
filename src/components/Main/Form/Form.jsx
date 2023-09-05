import './Form.css';
import React from "react";

function Form({onSubmit, children, error, className, isEditable, isValidForm, bntSaveName}) {
    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(event);
    }

    return (
        <form className={`form form__${className}`}
              name={className}
              onSubmit={handleSubmit}
        >
            {children}
            <span className={`form__error`}>{error.message}</span>
            <div className={`form__actions form__actions_type_${className}`}>
                <button type={'submit'}
                        disabled={!isValidForm}
                        className={`bnt from__bnt-save form__bnt-save_type_${className} ${isEditable && 'form__bnt_hidden'}`}>
                    {bntSaveName}
                </button>
            </div>
        </form>
    )
}

export default Form;
