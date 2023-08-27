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

export {isView, getPageName, getMoviesCardSizer};
