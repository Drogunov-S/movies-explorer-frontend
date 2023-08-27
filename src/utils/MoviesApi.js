import {moviesApiConfig} from '../config/config'

class MoviesApi {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getAllMovies() {
        return this._request(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: this._headers,
        })
    }

    _request(url, options) {
        // options.headers.authorization = localStorage.getItem('jwt');
        return fetch(url, options)
            .then(response => {
                return response.ok
                    ? response.json()
                    : Promise.reject(response.json());
            })
    }

}

const moviesApi = new MoviesApi(moviesApiConfig);
