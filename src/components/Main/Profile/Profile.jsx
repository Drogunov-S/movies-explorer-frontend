import './Profile.css';
import React, {useContext, useState} from 'react';
import {CurrentUserContext} from "../../../context/CurrentUserContext";
import Main from "../Main";
import {useValidate} from "../../../hooks/useValidate";
import Form from "../Form/Form";


function Profile({error, onUpdateProfile, onLogout, className}) {
    const {name, email} = useContext(CurrentUserContext);
    const [formValue, setFormValue] = useState(
        {name: name, email: email}
    );

    // const forms = useRef();
    const [isFormEditable, setFormEditable] = useState(true);
    // debugger
    const {handleValidation, errors, isFormValid} = useValidate('profile', []);

    function handleChange(e) {
        const input = e.target;
        handleValidation(e, className);
        setFormValue({
            ...formValue,
            [input.name]: input.value
        })
    }

    function handleEditBnt() {
        setFormEditable(!isFormEditable);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateProfile(formValue);
    }

    return (
        <Main>

            <section className={className} aria-label={'Профиль'}>
                <h2 className="profile__title">Привет, {name}</h2>
                <Form className={'profile'} onSubmit={handleSubmit} error={error} isEditable={isFormEditable}
                      isValidForm={isFormValid} bntSaveName={'Сохранить'}>
                    <fieldset className={'profile__fieldset'}>
                        <label className={"profile__line"} htmlFor={"name"}>
                            <span className={'profile__label'}>Имя</span>
                            <input
                                className={`profile__input ${isFormEditable && 'profile__input_non-active'}`}
                                id="name"
                                name="name"
                                type="text"
                                aria-label="Имя"
                                placeholder="Имя"
                                minLength="2"
                                maxLength="200"
                                required
                                readOnly={isFormEditable}
                                value={formValue.name}
                                onChange={handleChange}
                            />
                        </label>
                        <span className={'profile__error'}>{errors['name']}</span>
                        <label className={"profile__line"} htmlFor={"email"}>
                            <span className={'profile__label profile__label_type_end'}>E-mail</span>
                            <input
                                className={`profile__input ${isFormEditable && 'profile__input_non-active'}`}
                                id="email"
                                name="email"
                                type="email"
                                aria-label="E-mail"
                                placeholder="E-mail"
                                minLength="2"
                                maxLength="40"
                                required
                                readOnly={isFormEditable}
                                value={formValue.email}
                                onChange={handleChange}
                            />
                        </label>
                        <span className={'profile__error'}>{errors['email']}</span>
                    </fieldset>
                    <div className={"profile__actions"}>
                        <button className={`profile__edit-btn profile__bnt ${!isFormEditable && 'profile__bnt_hidden'}`}
                                type="button"
                                onClick={handleEditBnt}
                        >Редактировать
                        </button>
                        <button
                            className={`profile__logout-bnt  profile__bnt ${!isFormEditable && 'profile__bnt_hidden'}`}
                            type="button"
                            onClick={onLogout}
                        >Выйти из аккаунта
                        </button>
                    </div>
                </Form>
            </section>

        </Main>
    )
}

export default Profile;
