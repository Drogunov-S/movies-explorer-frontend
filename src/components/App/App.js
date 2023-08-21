import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Error from "../Error/Error";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Profile from "../Profile/Profile";
import React, {useState} from "react";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRouteElement";
import {mainApi} from "../../utils/mainApi";
import {defaultError, hiddenIn, defaultUser} from "../../config/config";
import {isView} from "../../utils/utility";

function App() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(defaultUser)
    const [error, setError] = useState(defaultError)


    React.useEffect(() => {
        handleDataUpdate();
    }, []);

    function handleError(error) {
        setError(error);
    }

    function handleAuth(token) {
        if (token) {
            localStorage.setItem('jwt', `Bearer ${token}`);
        }
        handleDataUpdate();
    }

    function handleDataUpdate() {
        if (localStorage.getItem('jwt')) {
            Promise.all([mainApi.getAboutMe()])
                .then(([userData]) => {
                    setCurrentUser({...userData, isAuth: true});
                    navigate('/', {replace: true});
                })
                .catch(console.log);
        }
    }

    function handleUpdateProfile(newDataProfile) {
        console.log(error);
        mainApi.updateProfile(newDataProfile)
            .then(dataProfile => {
                setCurrentUser(dataProfile);
                setError(defaultError);
                navigate('/profile', {replace: true});
            }).catch(error2 => {
            error2.then((err) => {
                console.log(error);
                console.log('err');
                console.log(err);
                setError({isError: true, message: err.message, statusCode: err.statusCode});
                console.log('after set error');
                console.log(error);
            });
        })
    }

    function logout() {
        console.log('logout');
        localStorage.removeItem('jwt');
        setCurrentUser(defaultUser);
        navigate('/sign-in', {replace: true});
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                {isView('header') && <Header/>}
                <Routes>
                    <Route path='*' element={<Navigate to={'/error'}/>}/>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/sign-in'}
                           element={<Login
                               title='Рады видеть!'
                               buttonText='Войти'
                               onLogin={handleAuth}
                               onError={null}
                           />}
                    />
                    <Route path={'/sign-up'}
                           element={
                               <Register title='Добро пожаловать!'
                                         buttonText='Зарегистрироваться'
                               />
                           }/>

                    <Route path={'/movies'}
                           element={
                               <ProtectedRouteElement
                                   element={Movies}
                               />
                           }
                    />
                    <Route path={'/saved-movies'}
                           element={
                               <ProtectedRouteElement
                                   element={SavedMovies}
                               />

                           }
                    />
                    <Route path={'/profile'}
                           element={
                               <ProtectedRouteElement
                                   element={Profile}
                                   error={error}
                                   onError={handleError}
                                   onUpdateProfile={handleUpdateProfile}
                                   onLogout={logout}
                               />
                           }
                    />
                    <Route path={'/error'} element={<Error code={'404'}
                                                           message={'Страница не найдена'}
                                                           link={'/'}
                                                           refText={'Назад'}/>}/>
                </Routes>
                {isView('footer') && <Footer/>}

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
