import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Main/Movies/Movies";
import SavedMovies from "../Main/SavedMovies/SavedMovies";
import Login from "../Main/Login/Login";
import Register from "../Main/Register/Register";
import Error from "../Main/Error/Error";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Profile from "../Main/Profile/Profile";
import React, {useState} from "react";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRouteElement";
import {mainApi} from "../../utils/mainApi";
import {defaultError, defaultUser} from "../../config/config";
import {isView} from "../../utils/utility";
import Landing from "../Main/Landing/Landing";

function App() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(defaultUser)
    const [error, setError] = useState(defaultError)

////TODO на время верстки
    React.useEffect(() => {
//         handleDataUpdate();
        setCurrentUser(defaultUser);
    }, []);

    function handleError(error) {
        setError(error);
    }

    function handleAuth(token) {
        //
        setCurrentUser({...currentUser, isAuth: true});
        navigate('/', {replace: true});
        //

        //TODO на время верстки
        // if (token) {
        //     localStorage.setItem('jwt', `Bearer ${token}`);
        // }
        // handleDataUpdate();
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
        setCurrentUser({isAuth: false});
        //TODO на время верстки
        // console.log('logout');
        // localStorage.removeItem('jwt');
        // setCurrentUser(defaultUser);
        // navigate('/sign-in', {replace: true});
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                {isView('header') && <Header/>}
                <Routes>
                    <Route path='*' element={<Navigate to={'/error'}/>}/>
                    <Route path={'/'} element={<Landing/>}/>
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
                                         classElement={'register'}
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
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
