import './Profile.css';
import React, {useState} from 'react';

function Profile() {
    const [formValue, setFormValue] = useState(
        {name: 'Виталий', email: 'pochta@yandex.ru'}
    );

    const [isFormEditable, setFormEditable] = useState(true);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleEditBnt = () => {
        setFormEditable(!isFormEditable);
    }

    return (
        <div className="profile">
            <h2 className="profile__title">Привет, Виталий!</h2>
            <form className="profile__form"
                // onSubmit={handleSubmit}
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
                            // placeholder="Пароль"
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
                            aria-label="Email"
                            // placeholder="Email"
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
                    <span className="profile__error">
                        При обновлении профиля произошла ошибка.
                    </span>
                    <button className={`profile__save_bnt profile__bnt ${isFormEditable && 'profile__bnt_hidden'}`}>
                        Сохранить
                    </button>
                    <button className={`profile__edit-btn profile__bnt ${!isFormEditable && 'profile__bnt_hidden'}`}
                            type="button"
                            onClick={handleEditBnt}
                    >Редактировать
                    </button>
                    <button className={`profile__logout-bnt  profile__bnt ${!isFormEditable && 'profile__bnt_hidden'}`}
                            type="button">Выйти из аккаунта
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Profile;
