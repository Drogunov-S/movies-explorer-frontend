import './Profile.css';
import React, {useContext, useState} from 'react';
import {CurrentUserContext} from "../../../context/CurrentUserContext";
import Main from "../Main";


function Profile({error, /*onError,*/ onUpdateProfile, onLogout}) {
    const {/*_id,*/ name, email} = useContext(CurrentUserContext);
    const [formValue, setFormValue] = useState(
        {name: name, email: email}
    );
    const [isFormEditable, setFormEditable] = useState(true);
    function handleChange(e) {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    function handleEditBnt() {
        setFormEditable(!isFormEditable);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateProfile(formValue);
        //     TODO редиректит на sign-in
    }

    return (
        <Main>
            <section className="profile" aria-label={'Профиль'}>
                <h2 className="profile__title">Привет, {name}</h2>
                <form className="profile__form"
                      onSubmit={handleSubmit}
                >
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
                    </fieldset>
                    <div className={"profile__actions"}>
                        {error.isError && <span className="profile__error">
                        {error.message}
                    </span>}
                        <button className={`profile__bnt-save profile__bnt ${isFormEditable && 'profile__bnt_hidden'}`}>
                            Сохранить
                        </button>
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
                </form>
            </section>
        </Main>
    )
}

export default Profile;
