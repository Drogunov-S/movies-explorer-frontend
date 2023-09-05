import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Main from "../Main";
import {useEffect, useState} from "react";
import {getFilteredMovies} from "../../../utils/utility";
import {DEFAULT_OBJECTS, KEY_STORE, MESSAGES} from "../../../config/constant";

function Movies({
                    onSearch
                    , movies
                    , onSaveMovie
                    , onDeleteMovie
                    , error, onError
                }) {

    const [query, setQuery] = useState(DEFAULT_OBJECTS.query);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const lastQueryState = JSON.parse(localStorage.getItem(KEY_STORE.queryMovies));
        if (lastQueryState) {
            setQuery({query: lastQueryState.query, isShortFilms: lastQueryState.isShortFilms});
            onSearch();
            const finedMovies = getFilteredMovies(lastQueryState, movies);
            if (finedMovies.length === 0) {
                setFilteredMovies(finedMovies);
                onError({isError: true, message: MESSAGES.errNotFound})
            } else {
                setFilteredMovies(finedMovies);
            }
        } else if (movies.length === 0) {
            onError({isError: true, message: MESSAGES.messEnterQuery});
        }
    }, [movies]);

    function handleFilter() {
        if (query.query === '') {
            onError({isError: true, message: MESSAGES.errNotEnterQuery});
            setFilteredMovies([]);
            return;
        }
        onSearch();
        const newArr = getFilteredMovies(query, movies);
        setFilteredMovies(newArr);
        if (newArr.length === 0) {
            onError({isError: true, message: MESSAGES.errNotFound});
        } else {
            onError(DEFAULT_OBJECTS.error);
        }
    }

    function handlerCheckbox(checked) {
        if (movies.length > 0) {
            const lastQueryState = JSON.parse(localStorage.getItem(KEY_STORE.queryMovies));
            const newQueryState = {...lastQueryState, isShortFilms: checked};
            localStorage.setItem(KEY_STORE.queryMovies, JSON.stringify(newQueryState));
            setFilteredMovies(getFilteredMovies(newQueryState, movies))
            // debugger
        }
    }

    return (
        <Main>
            <section className="movies" aria-label={'Фильмы'}>
                <SearchForm className={'movies__search-form'}
                            onSearch={handleFilter}
                            query={query}
                            setQuery={setQuery}
                            cookieKey={KEY_STORE.queryMovies}
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
