import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Movies from "../Main/Movies/Movies";
import SavedMovies from "../Main/SavedMovies/SavedMovies";
import Login from "../Main/Login/Login";
import Register from "../Main/Register/Register";
import Error from "../Main/Error/Error";
import Profile from "../Main/Profile/Profile";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRouteElement";
import {mainApi} from "../../utils/mainApi";
import Landing from "../Main/Landing/Landing";
import {moviesApi} from "../../utils/moviesApi";
import {ErrorContext} from "../../context/ErrorContext";
import Preloader from "../Main/Preloader/Preloader";
import {useEffect, useState} from "react";
import {isView, saveToken} from "../../utils/utility";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {
    API_CONFIGS,
    DEFAULT_OBJECTS,
    ELEMENTS_NAME,
    KEY_STORE,
    MESSAGES,
    PRELOADER_STATES,
    ROUTES,
    TIME_OUTS
} from "../../config/constant";


function App() {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [currentUser, setCurrentUser] = useState(DEFAULT_OBJECTS.user)
    const [error, setError] = useState(DEFAULT_OBJECTS.error)
    const [movies, setMovies] = useState([])
    const [savedMovies, setSavedMovies] = useState([]);
    const [isLoadingPopup, setLoaderState] = useState(PRELOADER_STATES.on);


    /**
     * Хук для загрузки данных при наличии JWT в LocalStorage
     * */
    useEffect(() => {
        if (localStorage.getItem(KEY_STORE.jwt)) {
            authorization()
                .then(() => {
                })
                .catch(() => {
                    setCurrentUser(DEFAULT_OBJECTS.user);
                });
        } else {
            setLoaderState(PRELOADER_STATES.off);
        }
    }, []);

    useEffect(() => {
        setError(DEFAULT_OBJECTS.error);
    }, [pathname]);

    /**
     * Функция регистрации нового пользователя
     * */
    function handlerRegister(userData) {
        setLoaderState(PRELOADER_STATES.on);
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
                    handleError({message: MESSAGES.errAnother, isError: true})
                }
            })
            .finally(() => {
                setLoaderState(PRELOADER_STATES.off);
            });
    }

    /**
     * Функция для входа в систему
     * */
    function handlerLogin(credentials) {
        setLoaderState(PRELOADER_STATES.on);
        mainApi.authentication(credentials)
            .then(({token}) => {
                saveToken(KEY_STORE.jwt, token);
                authorization()
                    .then(() => {
                        navigate(ROUTES.movies, {replace: true});
                    }).catch(() => {
                    setCurrentUser(DEFAULT_OBJECTS.user)
                });
            }).catch(err => {
            err.then(({message}) => {
                setError({message: message, isError: true});
            })
                .finally(() => {
                    setLoaderState(PRELOADER_STATES.off);
                })
        })
    }

    /**
     * Функция проверки токена и выдачи прав на вход на защищенные страницы
     * */
    function authorization() {
        setLoaderState(PRELOADER_STATES.on);
        const token = localStorage.getItem(KEY_STORE.jwt);
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
                setCurrentUser(DEFAULT_OBJECTS.user);
            })
            .finally(() => {
                setLoaderState(PRELOADER_STATES.off);
            });
    }

    function logout() {
        localStorage.removeItem(KEY_STORE.jwt);
        localStorage.removeItem(KEY_STORE.queryMovies);
        localStorage.removeItem(KEY_STORE.querySavedMovies);
        setCurrentUser(DEFAULT_OBJECTS.user);
        navigate(ROUTES.main, {replace: true});
    }

    function handlerUpdateProfile(newDataProfile) {
        setLoaderState(1);
        mainApi.updateProfile(newDataProfile)
            .then(dataProfile => {
                setCurrentUser({...dataProfile, isAuth: currentUser.isAuth});
            }).catch(err => {
            err.then((err) => {
                setError({isError: true, message: err.message});
            });
        }).finally(() => {
            setLoaderState(PRELOADER_STATES.message);
            setTimeout(() => {
                setLoaderState(PRELOADER_STATES.off);
            }, TIME_OUTS.showAccess)
        })
    }

    function handleRequestMovies() {
        setLoaderState(PRELOADER_STATES.on);
        setError(DEFAULT_OBJECTS.error);
        if (movies.length === PRELOADER_STATES.off) {
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
                            , image: API_CONFIGS.movies_api.baseUrl + item.image.url
                            , thumbnail: API_CONFIGS.movies_api.baseUrl + item.image.formats.thumbnail.url
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
                    setLoaderState(PRELOADER_STATES.off);
                });
        }
        setLoaderState(PRELOADER_STATES.off);
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
            ? <Preloader state={isLoadingPopup} message={'Сохраннено'}/>
            :
            <ErrorContext.Provider value={error}>
                <CurrentUserContext.Provider value={currentUser}>
                    <div className="App">
                        {isView(ELEMENTS_NAME.header) && <Header/>}
                        <Routes>
                            <Route path={ROUTES.all} element={<Navigate to={ROUTES.error} replace={true}/>}/>
                            <Route path={ROUTES.main} element={<Landing/>}/>
                            <Route path={ROUTES.signin}
                                   element={
                                       currentUser.isAuth
                                           ? <Navigate to={ROUTES.movies} replace/>
                                           : <Login
                                               title='Рады видеть!'
                                               buttonText='Войти'
                                               onLogin={handlerLogin}
                                               onError={handleError}
                                               error={error}
                                           />}
                            />
                            <Route path={ROUTES.signup}
                                   element={
                                       currentUser.isAuth
                                           ? <Navigate to={ROUTES.movies} replace/>
                                           : <Register title='Добро пожаловать!'
                                                       buttonText='Зарегистрироваться'
                                                       classElement={'register'}
                                                       onRegistration={handlerRegister}
                                                       onError={handleError}
                                                       error={error}
                                           />
                                   }/>

                            <Route path={ROUTES.movies}
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
                            <Route path={ROUTES.savedMovies}
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
                            <Route path={ROUTES.profile}
                                   element={
                                       <ProtectedRouteElement
                                           element={Profile}
                                           error={error}
                                           onError={handleError}
                                           onUpdateProfile={handlerUpdateProfile}
                                           onLogout={logout}
                                           className={ELEMENTS_NAME.profile}
                                       />
                                   }
                            />
                            <Route path={ROUTES.error} element={<Error code={'404'}
                                                                       message={'Страница не найдена'}
                                                                       refText={'Назад'}/>}/>
                        </Routes>
                        {isView(ELEMENTS_NAME.footer) && <Footer/>}
                    </div>
                </CurrentUserContext.Provider>
            </ErrorContext.Provider>
    );
}

export default App;
