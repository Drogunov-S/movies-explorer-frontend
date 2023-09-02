const hiddenIn = {
    header: ['/sign-in', '/sign-up', '/error'],
    footer: ['/sign-in', '/sign-up', '/error', '/profile']
};

let defaultUser = {
    isAuth: false,
    _id: '',
    name: 'Виталий',
    email: 'pochta@yandex.ru',
}

const defaultError = {isError: false, message: ''}

const mainApiConfig = {
    baseUrl: 'http://localhost:3005',
    // baseUrl: 'https://api.movie-drogunov.nomoredomains.xyz',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

const moviesApiConfig = {
    baseUrl: 'https://api.nomoreparties.co',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

export {
    defaultUser,
    defaultError,
    hiddenIn,
    mainApiConfig,
    moviesApiConfig
}
