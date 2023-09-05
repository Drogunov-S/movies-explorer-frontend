export const KEY_STORE = {
        jwt: 'jwt'
        , querySavedMovies: 'stateSearchSavedMovies'
        , queryMovies: 'stateSearchMovies'
    }
;

export const ELEMENTS_NAME = {
    header: 'header'
    , footer: 'footer'
    , aboutProject: 'aboutProject'
    , techs: 'techs'
    , aboutMe: 'aboutMe'
    , profile: 'profile'
};

export const LINKS = {
    practicum: 'https://practicum.yandex.ru/'
    , gitHub: 'https://github.com/Drogunov-S'
    , portfolio: {
        staticSite: 'https://drogunov-s.github.io/how-to-learn_public/'
        , adaptiveSite: 'https://drogunov-s.github.io/russian-travel-public/'
        , srp: 'https://drogunov-s.github.io/react-mesto-auth-public/'
    }
};

export const FORMS = {
    login: {name: 'login', requiredField: [{name: 'email'}, {name: 'password'}]}
    , profile: {name: 'profile', requiredField: []}
    , register: {name: 'register', requiredField: [{name: 'name'}, {name: 'email'}, {name: 'password'}]}
};

export const MESSAGES = {
    messEnterQuery: 'Введите запрос для поиска'
    , messNotSaveMovie: 'Нет сохраненных фильмов'
    , errAnother: 'Возникла непредвиденная ошибка'
    , errNotEnterQuery: 'Необходимо ввести запрос'
    , errNotFound: 'Ничего не найдено'
    , errValidEmail: 'Неверный email'
    , errValidName: 'Введите корректное имя.'
    , errValidEqualsData: 'Данные должны отличатся от старых'

};

export const ROUTES = {
        all: '*'
        , main: '/'
        , signin: '/sign-in'
        , signup: '/sign-up'
        , movies: '/movies'
        , savedMovies: '/saved-movies'
        , profile: '/profile'
        , error: '/error'
    }
;

export const DEFAULT_OBJECTS = {
    hiddenIn: {
        header: ['/sign-in', '/sign-up', '/error']
        , footer: ['/sign-in', '/sign-up', '/error', '/profile']
    },
    user: {
        isAuth: false
        , _id: ''
        , name: 'Виталий'
        , email: 'pochta@yandex.ru',
    },
    error: {
        isError: false
        , message: ''
    },
    query: {
        query: ''
        , isShortFilms: false
    }
}

export const API_CONFIGS = {
    main_api: {
        // baseUrl: 'http://localhost:3005',
        baseUrl: 'https://api.movie-drogunov.nomoredomains.xyz',
        headers: {
            'Accept': 'application/json'
            , 'Content-Type': 'application/json'
        }
    }
    , movies_api: {
        baseUrl: 'https://api.nomoreparties.co',
        headers: {
            'Accept': 'application/json'
            , 'Content-Type': 'application/json'
        }
    }
}

export const PRELOADER_STATES = {
    off: 0
    , on: 1
    , message: 2
}

export const TIME_OUTS = {
    showAccess: 1500,
}
