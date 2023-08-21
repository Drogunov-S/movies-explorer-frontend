import {mainApiConfig} from '../config/config'

class MainApi {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    register(userData) {
        return this._request(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(userData)
        })
    }

    authorize(credential) {
        return this._request(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(credential)
        })
    }

    getAboutMe() {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
    }

    updateProfile(userData) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userData)
        })
    }

    getSavedMovies() {
        return this._request(`${this._baseUrl}/movies`, {
            headers: this._headers
        })
    }

    createMovie(movie) {
        return this._request(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(movie)
        })
    }

    deleteMovie(movieId) {
        return this._request(`${this._baseUrl}/movies/${movieId}`, {
            method: "DELETE",
            headers: this._headers
        });
    }

    _request(url, options) {
        options.headers.authorization = localStorage.getItem('jwt');
        return fetch(url, options)
            .then(response => {
                return response.ok
                    ? response.json()
                    : Promise.reject(response.json());
            })
    }

}

const mainApi = new MainApi(mainApiConfig);

export {mainApi};