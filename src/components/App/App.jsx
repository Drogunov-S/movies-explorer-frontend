import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Main/Movies/Movies";
import SavedMovies from "../Main/SavedMovies/SavedMovies";
import Login from "../Main/Login/Login";
import Register from "../Main/Register/Register";
import Error from "../Main/Error/Error";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Profile from "../Main/Profile/Profile";
import React, {useEffect, useState} from "react";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRouteElement";
import {mainApi} from "../../utils/mainApi";
import {defaultError, defaultUser, moviesApiConfig} from "../../config/config";
import {isView, saveToken} from "../../utils/utility";
import Landing from "../Main/Landing/Landing";
import {moviesApi} from "../../utils/moviesApi";
import {ErrorContext} from "../../context/ErrorContext";
import Preloader from "../Main/Preloader/Preloader";
import {
    ELEMENT_NAME_FOOTER,
    ELEMENT_NAME_HEADER,
    ERROR_ANOTHER,
    KEY_STORE_JWT,
    KEY_STORE_QUERY_MOVIES,
    KEY_STORE_QUERY_SAVED_MOVIES
} from "../../config/constant";
import {
    ROUTE_ALL,
    ROUTE_ERROR,
    ROUTE_MAIN,
    ROUTE_MOVIES,
    ROUTE_PROFILE,
    ROUTE_SAVED_MOVIES,
    ROUTE_SIGNIN,
    ROUTE_SIGNUP
} from "../../config/routes";

function App() {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [currentUser, setCurrentUser] = useState(defaultUser)
    const [error, setError] = useState(defaultError)
    const [movies, setMovies] = useState([])
    const [savedMovies, setSavedMovies] = useState([]);
    const [isLoadingPopup, setLoaderState] = useState(1);


    /**
     * Хук для загрузки данных при наличии JWT в LocalStorage
     * */
    useEffect(() => {
        if (localStorage.getItem(KEY_STORE_JWT)) {
            authorization()
                .then(() => {
                })
                .catch(() => {
                    setCurrentUser(defaultUser);
                });
        } else {
            setLoaderState(0);
        }
    }, []);

    useEffect(() => {
        setError(defaultError);
    }, [pathname]);

    /**
     * Функция регистрации нового пользователя
     * */
    function handlerRegister(userData) {
        setLoaderState(1);
        mainApi.register(userData)
            .then(createdUser => {
                handlerLogin({email: userData.email, password: userData.password});
            })
            .catch(err => {
                if (err.then) {
                    err.then(({message}) => {
                        handleError({message: message, isError: true})
                    })
                } else {
                    handleError({message: ERROR_ANOTHER, isError: true})
                }
            })
            .finally(() => {
                setLoaderState(0);
            });
    }

    /**
     * Функция для входа в систему
     * */
    function handlerLogin(credentials) {
        setLoaderState(1);
        mainApi.authentication(credentials)
            .then(({token}) => {
                saveToken(KEY_STORE_JWT, token);
                authorization()
                    .then(() => {
                        navigate('/movies', {replace: true});
                    }).catch(() => {
                    setCurrentUser(defaultUser)
                });
            }).catch(err => {
            err.then(({message}) => {
                setError({message: message, isError: true});
            })
                .finally(() => {
                    setLoaderState(0);
                })
        })
    }

    /**
     * Функция проверки токена и выдачи прав на вход на защищенные страницы
     * */
    function authorization() {
        setLoaderState(1);
        const token = localStorage.getItem('jwt');
        return Promise.all([
            mainApi.checkToken(token)
            , mainApi.getAboutMe()
            , mainApi.getSavedMovies()
        ])
            .then(([isValidToken, dataUser, savedMovies]) => {
                setCurrentUser({...dataUser, isAuth: true});
                setSavedMovies(savedMovies);
                return Promise.resolve(dataUser);
            })
            .catch(() => {
                setCurrentUser(defaultUser);
            })
            .finally(() => {
                setLoaderState(0);
            });
    }

    function logout() {
        localStorage.removeItem(KEY_STORE_JWT);
        localStorage.removeItem(KEY_STORE_QUERY_SAVED_MOVIES);
        localStorage.removeItem(KEY_STORE_QUERY_MOVIES);
        setCurrentUser(defaultUser);
        navigate(ROUTE_MAIN, {replace: true});
    }

    function handlerUpdateProfile(newDataProfile) {
        setLoaderState(1);
        mainApi.updateProfile(newDataProfile)
            .then(dataProfile => {
                setCurrentUser({...dataProfile, isAuth: currentUser.isAuth});
            }).catch(err => {
            err.then((err) => {
                setError({isError: true, message: err.message, statusCode: err.statusCode});
            });
        }).finally(() => {
            setLoaderState(2);
            setTimeout(() => {
                setLoaderState(0);
            }, 1500)
        })
    }

    function handleRequestMovies() {
        setLoaderState(1);
        setError(defaultError);
        if (movies.length === 0) {
            moviesApi.getAllMovies()
                .then(movies => {
                    const newMovies = [];
                    let newMovie;
                    movies.forEach(item => {
                        newMovie = {
                            id: item.id
                            , nameRU: item.nameRU
                            , nameEN: item.nameEN
                            , director: item.director
                            , country: item.country
                            , year: item.year
                            , duration: item.duration
                            , description: item.description
                            , trailerLink: item.trailerLink
                            , image: moviesApiConfig.baseUrl + item.image.url
                            , thumbnail: moviesApiConfig.baseUrl + item.image.formats.thumbnail.url
                        }
                        savedMovies.forEach(savedMovie => {
                            if (savedMovie.id === item.id) {
                                newMovie._id = savedMovie._id;
                            }
                        })
                        newMovies.push(newMovie);
                    });
                    setMovies(newMovies);

                })
                .catch(console.log)
                .finally(() => {
                    setLoaderState(0);
                });
        }
        setLoaderState(0);
    }

    function handleError(error) {
        setError(error);
    }

    function handleSaveMovie(movie) {
        mainApi.createMovie(movie)
            .then(saveMovie => {
                const newMovies = movies.reduce((previousArr, item) => {
                    if (item.id === saveMovie.id) {
                        item._id = saveMovie._id;
                    }
                    previousArr.push(item)
                    return previousArr;
                }, []);
                setSavedMovies([...savedMovies, saveMovie])
                setMovies(newMovies);
            })
            .catch(console.log)
        ;
    }

    function handleDeleteMovie(movie) {
        const {_id} = movie;
        mainApi.deleteMovie(_id)
            .then(() => {
                const newMovies = movies.reduce((previousArr, item) => {
                    if (item.id === movie.id) {
                        delete item._id;
                    }
                    previousArr.push(item)
                    return previousArr;
                }, []);
                setMovies(newMovies)
                const newSavedMovies = savedMovies.reduce((previousArr, item) => {
                    if (item.id !== movie.id) {
                        previousArr.push(item)
                    }
                    return previousArr;
                }, []);
                setSavedMovies(newSavedMovies)
            })
            .catch(console.log)
    }

    return (
        isLoadingPopup
            ? <Preloader state={isLoadingPopup} message={'Сохранено'}/>
            :
            <ErrorContext.Provider value={error}>
                <CurrentUserContext.Provider value={currentUser}>
                    <div className="App">
                        {isView(ELEMENT_NAME_HEADER) && <Header/>}
                        <Routes>
                            <Route path={ROUTE_ALL} element={<Navigate to={ROUTE_ERROR} replace={true}/>}/>
                            <Route path={ROUTE_MAIN} element={<Landing/>}/>
                            <Route path={ROUTE_SIGNIN}
                                   element={
                                       currentUser.isAuth
                                           ? <Navigate to={ROUTE_MOVIES} replace/>
                                           : <Login
                                               title='Рады видеть!'
                                               buttonText='Войти'
                                               onLogin={handlerLogin}
                                               onError={handleError}
                                               error={error}
                                           />}
                            />
                            <Route path={ROUTE_SIGNUP}
                                   element={
                                       currentUser.isAuth
                                           ? <Navigate to={ROUTE_MOVIES} replace/>
                                           : <Register title='Добро пожаловать!'
                                                       buttonText='Зарегистрироваться'
                                                       classElement={'register'}
                                                       onRegistration={handlerRegister}
                                                       onError={handleError}
                                                       error={error}
                                           />
                                   }/>

                            <Route path={ROUTE_MOVIES}
                                   element={
                                       <ProtectedRouteElement
                                           element={Movies}
                                           movies={movies}
                                           onSearch={handleRequestMovies}
                                           onSaveMovie={handleSaveMovie}
                                           onDeleteMovie={handleDeleteMovie}
                                           error={error}
                                           onError={handleError}
                                       />
                                   }
                            />
                            <Route path={ROUTE_SAVED_MOVIES}
                                   element={
                                       <ProtectedRouteElement
                                           element={SavedMovies}
                                           movies={savedMovies}
                                           onSerarch={'null'}
                                           onSaveMovie={handleSaveMovie}
                                           onDeleteMovie={handleDeleteMovie}
                                           error={error}
                                           onError={handleError}
                                       />

                                   }
                            />
                            <Route path={ROUTE_PROFILE}
                                   element={
                                       <ProtectedRouteElement
                                           element={Profile}
                                           error={error}
                                           onError={handleError}
                                           onUpdateProfile={handlerUpdateProfile}
                                           onLogout={logout}
                                           className={'profile'}
                                           // onValidating={handleValidation}
                                           // isValid={validator}
                                       />
                                   }
                            />
                            <Route path={ROUTE_ERROR} element={<Error code={'404'}
                                                                      message={'Страница не найдена'}
                                                                      refText={'Назад'}/>}/>
                        </Routes>
                        {isView(ELEMENT_NAME_FOOTER) && <Footer/>}
                    </div>
                </CurrentUserContext.Provider>
            </ErrorContext.Provider>
    );
}

export default App;
