import {API_CONFIGS} from "../config/constant";

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
        return fetch(url, options)
            .then(response => {
                return response.ok
                    ? response.json()
                    : Promise.reject(response.json());
            })
    }
}

const moviesApi = new MoviesApi(API_CONFIGS.movies_api);

export {moviesApi};
