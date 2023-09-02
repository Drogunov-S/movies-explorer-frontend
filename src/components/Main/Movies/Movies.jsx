import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Main from "../Main";
import {useEffect, useState} from "react";
import {getFilteredMovies} from "../../../utils/utility";
import {defaultError} from "../../../config/config";
import {
    KEY_STORE_QUERY_MOVIES,
    MESS_ENTER_QUERY,
    MESS_ERR_NOT_ENTER_QUERY,
    MESS_ERR_NOT_FOUND
} from "../../../config/constant";

function Movies({onSearch, movies, onSaveMovie, onDeleteMovie, error, onError}) {
    const [query, setQuery] = useState({query: '', isShortFilms: false});
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const lastQueryState = JSON.parse(localStorage.getItem(KEY_STORE_QUERY_MOVIES));
        if (lastQueryState) {
            setQuery({query: lastQueryState.query, isShortFilms: lastQueryState.isShortFilms});
            if (movies.length > 0) {
                const newArray = getFilteredMovies(lastQueryState, movies);
                setFilteredMovies(newArray);
                if (newArray.length > 0) {
                    onError(defaultError);
                }
            }
        }
        if (movies.length === 0) {
            onError({isError: true, message: MESS_ENTER_QUERY});
        }
    }, [movies]);

    function handleFilter() {
        if (movies.length === 0) {
            if (query.query === '') {
                onError({isError: true, message: MESS_ERR_NOT_ENTER_QUERY});
                return
            }
            onSearch();
        }
        const newArr = getFilteredMovies(query, movies);
        setFilteredMovies(newArr);
        if (newArr.length === 0) {
            onError({isError: true, message: MESS_ERR_NOT_FOUND});
        } else {
            onError(defaultError);
        }
    }

    function handlerCheckbox(checked) {
        if (movies.length > 0) {
            const lastQueryState = JSON.parse(localStorage.getItem(KEY_STORE_QUERY_MOVIES));
            setFilteredMovies(getFilteredMovies({...lastQueryState, isShortFilms: checked}, movies))
        }
    }

    return (
        <Main>
            <section className="movies" aria-label={'Фильмы'}>
                <SearchForm className={'movies__search-form'}
                            onSearch={handleFilter}
                            query={query}
                            setQuery={setQuery}
                            cookieKey={KEY_STORE_QUERY_MOVIES}
                            onCheckbox={handlerCheckbox}
                />
                <MoviesCardList
                    className={'movies__card-list'}
                    movies={filteredMovies}
                    onSaveMovie={onSaveMovie}
                    onDeleteMovie={onDeleteMovie}
                    error={error}
                />
            </section>
        </Main>
    );
}

export default Movies;
