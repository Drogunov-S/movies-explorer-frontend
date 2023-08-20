import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Error from "../Error/Error";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Profile from "../Profile/Profile";
import React, {useState} from "react";
import {CurrentUserContext} from "../../context/CurrentUserContext";

function App() {

    const [isLogin, setLoginState] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        isAuth: false,
        _id: '',
        name: 'defaultName',
        email: 'example@mail.ru',
    })

    // const isView = () => {
    //
    // }};

    // const routesWithOutHeaderAndFooter = ['/sign-in', '/sign-up', '/error', '/profile'];

    const handlerLoginState = (isLogin) => {
        setLoginState(!isLogin)
    }

    const loc = useLocation().pathname;
    // console.log(loc);
    const sin = '/sign-in';
    const siu = '/sign-up';
    const pro = '/profile';
    const isError = '/error' === loc;
    // const isLogi = true;
    const isLogi = (loc === siu || loc === sin);
    console.log(isError);
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                {!isLogi && !isError && <Header isLogin={isLogin} handlerLoginState={handlerLoginState}/>}
                <Routes>
                    <Route path='*' element={<Navigate to={'/error'}/>}/>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/sign-in'}
                           element={<Login
                               title='Рады видеть!'
                               buttonText='Войти'
                               onLogin={null}
                               onError={null}
                           />}
                    />
                    <Route path={'/sign-up'}
                           element={
                               <Register title='Добро пожаловать!'
                                         buttonText='Зарегистрироваться'
                                         onLogin={null}
                                         onError={null}
                               />
                           }/>
                    <Route path={'/movies'}
                           element={
                               <Movies/>
                           }
                    />
                    <Route path={'/saved-movies'}
                           element={
                               <SavedMovies/>
                           }
                    />
                    <Route path={'/profile'}
                           element={
                               <Profile
                                   /* buttonText={'key'}
                                    title={'Привет, Виталий!'}
                                    onError={null}
                                    onLogin={null}*/
                               />
                           }
                    />
                    <Route path={'/error'} element={<Error code={'404'}
                                                           message={'Страница не найдена'}
                                                           link={'/'}
                                                           refText={'Назад'}/>}/>
                </Routes>
                {!(isLogi || (loc === pro)) && !isError && <Footer/>}

                {/*<Movies/>*/}
                {/*<SavedMovies/>*/}
                {/*<Footer/>*/}
                {/*

            <Error code={'404'}
                   message={'Страница не найдена'}
                   link={'dsf'}
                   refText={'Назад'}
            />*/}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
