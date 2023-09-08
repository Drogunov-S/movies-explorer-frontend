import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Main from "../Main";
import SearchForm from "../SearchForm/SearchForm";
import {useEffect, useState} from "react";
import {getFilteredMovies} from "../../../utils/utility";
import {DEFAULT_OBJECTS, KEY_STORE, MESSAGES} from "../../../config/constant";

function SavedMovies({
                         movies
                         , onSaveMovie
                         , onDeleteMovie
                         , error
                         , onError
                     }) {
    const [query, setQuery] = useState(DEFAULT_OBJECTS.query);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        if (movies.length === 0) {
            setFilteredMovies([]);
            onError({isError: true, message: MESSAGES.messNotSaveMovie});
            return;
        }
        const findMovies = getFilteredMovies(query, movies);
        if (findMovies.length > 0) {
            setFilteredMovies(findMovies);
        } else {
            setFilteredMovies([]);
            onError({isError: true, message: MESSAGES.errNotFound});
        }
    }, [movies]);

    function handleFilter() {
        if (movies.length === 0) {
            onError({isError: true, message: MESSAGES.messNotSaveMovie});
            return;
        }
        const foundMovies = getFilteredMovies(query, movies);
        if (foundMovies.length === 0) {
            onError({isError: true, message: MESSAGES.errNotFound});
            setFilteredMovies([]);
        } else {
            onError(DEFAULT_OBJECTS.error);
            setFilteredMovies(foundMovies);
        }
    }

    function handlerCheckbox(checked) {
        if (movies.length === 0) {
            onError({isError: true, message: MESSAGES.messNotSaveMovie});
            return
        }
        const foundMovies = getFilteredMovies({...query, isShortFilms: checked}, movies)
        if (foundMovies.length === 0) {
            onError({isError: true, message: MESSAGES.errNotFound});
            setFilteredMovies([]);
        } else {
            onError(DEFAULT_OBJECTS.error);
            setFilteredMovies(foundMovies);
        }
    }

    return (
        <Main>
            <section className="saved-movies" aria-label={'Сохраненные фильмы'}>
                <SearchForm className={'saved-movies__search-form'}
                            onSearch={handleFilter}
                            query={query}
                            setQuery={setQuery}
                            cookieKey={KEY_STORE.querySavedMovies}
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
