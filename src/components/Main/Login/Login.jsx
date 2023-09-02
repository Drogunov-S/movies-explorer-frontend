import './Login.css';
import React, {useState} from 'react';
import logo from "../../../images/logos/logo.svg";
import {Link} from "react-router-dom";
import Main from "../Main";
import {useValidate} from "../../../hooks/useValidate";
import Form from "../Form/Form";
import {FORM_LOGIN} from "../../../config/constant";

function Login({title, onLogin, error}) {

    const {
        handleValidation,
        errors,
        isFormValid,
    } = useValidate(FORM_LOGIN.name, FORM_LOGIN.requiredField);
    const [formValue, setFormValue] = useState(
        {email: '', password: ''}
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        handleValidation(e);
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    function handleSubmit() {
        onLogin(formValue);
    }


    return (
        <Main>
            <section className="container" aria-label={'Вход'}>
                <div className="login">
                    <Link to={'/'} className={"bnt login__logo"}>
                        <img className="login__logo-img"
                             alt={"Логотип"}
                             src={logo}
                        />
                    </Link>
                    <h2 className="login__title">{title}</h2>
                    <Form
                        className={'login'}
                        bntSaveName={'Войти'}
                        error={error}
                        onSubmit={handleSubmit}
                        isValidForm={isFormValid}
                    >
                        <label className={"login__label"} htmlFor={"email"}>E-mail</label>
                        <input
                            className="login__input login__input_theme_dark"
                            id="email"
                            name="email"
                            type="email"
                            aria-label="Email"
                            placeholder="E-mail"
                            minLength="2"
                            maxLength="40"
                            required
                            value={formValue.email}
                            onChange={handleChange}
                        />
                        <span className={'login__error'}>{errors.email}</span>
                        <label className={"login__label"} htmlFor={"password"}>Пароль</label>
                        <input
                            className="login__input login__input_theme_dark"
                            id="password"
                            name="password"
                            type="password"
                            aria-label="Пароль"
                            placeholder="Пароль"
                            minLength="2"
                            maxLength="200"
                            required
                            value={formValue.password}
                            onChange={handleChange}
                        />
                        <span className={'login__error'}>{errors.password}</span>
                    </Form>
                    <div className="login__wrapper">
                        <p className={"login__subtext"}>Ещё не зарегистрированы?</p>
                        <Link to="/sign-up" className="bnt login__link">Регистрация</Link>
                    </div>
                </div>
            </section>
        </Main>
    )
}

export default Login;
