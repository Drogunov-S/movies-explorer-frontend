import {DEFAULT_OBJECTS} from "../config/constant";

function isView(nameElement) {
    let pathname = window.location.pathname;
    return !DEFAULT_OBJECTS.hiddenIn[nameElement].some((element) => element === pathname)
}

function getPageName() {
    let pathname = window.location.pathname;
    return pathname === '/' ? 'main' : pathname.slice(1);
}

function getMoviesCardSizer(width) {
    if (width >= 1280) {
        return {rows: 4, columns: 3, max: 12, addsCard: 3}
    } else if (width >= 768) {
        return {rows: 4, columns: 2, max: 8, addsCard: 2}
    } else {
        return {rows: 5, columns: 1, max: 5, addsCard: 2}
    }
}

function getStringTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours === 0 ? '' : `${hours}ч `}${min === 0 ? '' : `${min}м`}`;
}

function saveToken(name, token) {
    token = `Bearer ${token}`
    localStorage.setItem(name, token);
    return token;
}

function getFilteredMovies(query, arr) {
    return arr.filter(movie => {
        return !query.query || query.query === '' || movie.nameRU.toLowerCase().includes(query.query.toLowerCase())
            || movie.nameEN.toLowerCase().includes(query.query.toLowerCase());
    }).filter(movie => {
        return query.isShortFilms === false || movie.duration < 40
    })
}

function isEmail(string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(string);
}

function isName(string) {
    const regex = /^[a-zA-Zа-яА-Я\s-]+$/;
    return regex.test(string);
}

function isEqualCurrentUserData(fields, user) {
    let counterEqualsField = 0;
    const fieldsKeys = Object.keys(fields);
    fieldsKeys.forEach(key => {
        if (fields[`${key}`] === user[`${key}`]) {
            counterEqualsField++;
        }
    })
    console.log('counterEqualsField === Object.keys(fields).length');
    console.log(counterEqualsField === Object.keys(fields).length);
    return counterEqualsField === Object.keys(fields).length;
}

export {
    isView
    , isName
    , isEqualCurrentUserData
    , getPageName
    , getMoviesCardSizer
    , getStringTime
    , saveToken
    , getFilteredMovies
    , isEmail
};
