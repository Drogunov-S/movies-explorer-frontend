import {hiddenIn} from "../config/config";

function isView(nameElement) {
    let pathname = window.location.pathname;
    return !hiddenIn[nameElement].some((element) => element === pathname)
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
        return movie.nameRU.toLowerCase().includes(query.query.toLowerCase())
            || movie.nameEN.toLowerCase().includes(query.query.toLowerCase())
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

export {isView, isName, getPageName, getMoviesCardSizer, getStringTime, saveToken, getFilteredMovies, isEmail};
