import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Main from "../Main";
import SearchForm from "../SearchForm/SearchForm";
import {useEffect, useState} from "react";
import {getFilteredMovies} from "../../../utils/utility";
import {defaultError} from "../../../config/config";
import {KEY_STORE_QUERY_SAVED_MOVIES, MESS_ERR_NOT_FOUND, MESS_NOT_SAVE_MOVIE} from "../../../config/constant";

function SavedMovies({movies, onSaveMovie, onDeleteMovie, error, onError}) {
    const [query, setQuery] = useState({query: '', isShortFilms: false});
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        if (movies.length > 0) {
            setFilteredMovies(movies);
        } else {
            setFilteredMovies([]);
            onError({isError: true, message: MESS_NOT_SAVE_MOVIE});
        }
    }, [movies]);

    function handleFilter() {
        if (movies.length === 0) {
            onError({isError: true, message: MESS_NOT_SAVE_MOVIE});
            return;
        }
        const foundMovies = getFilteredMovies(query, movies);
        if (foundMovies.length === 0) {
            onError({isError: true, message: MESS_ERR_NOT_FOUND});
            setFilteredMovies([]);
        } else {
            onError(defaultError);
            setFilteredMovies(foundMovies);
        }
    }

    function handlerCheckbox(checked) {
        if (movies.length > 0) {
            const lastQueryState = JSON.parse(localStorage.getItem(KEY_STORE_QUERY_SAVED_MOVIES));
            setFilteredMovies(getFilteredMovies({...lastQueryState, isShortFilms: checked}, movies))
        }
    }

    return (
        <Main>
            <section className="saved-movies" aria-label={'Сохраненные фильмы'}>
                <SearchForm className={'saved-movies__search-form'}
                            onSearch={handleFilter}
                            query={query}
                            setQuery={setQuery}
                            cookieKey={KEY_STORE_QUERY_SAVED_MOVIES}
                            onCheckbox={handlerCheckbox}
                />
                <MoviesCardList
                    movies={filteredMovies}
                    className={"saved-movies__movie-card-list"}
                    onSaveMovie={onSaveMovie}
                    onDeleteMovie={onDeleteMovie}
                    error={error}
                />
            </section>
        </Main>
    );
}

export default SavedMovies;
