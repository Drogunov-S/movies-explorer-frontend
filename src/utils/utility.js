import {hiddenIn} from "../config/config";
function isView(nameElement) {
    let pathname = window.location.pathname;
    return !hiddenIn[nameElement].some((element) => element === pathname)
}

export {isView};
