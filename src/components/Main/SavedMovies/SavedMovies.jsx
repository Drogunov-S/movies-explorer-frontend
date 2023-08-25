import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {moviesSave} from "../../../utils/moviesSave";
import Main from "../Main";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
    return (
        <Main>
            <section className="saved-movies" aria-label={'Сохраненные фильсы'}>
                <SearchForm className={'saved-movies__search-form'}/>
                <MoviesCardList
                    movies={moviesSave}
                    className={"saved-movies__movie-card-list"}
                />
            </section>
        </Main>
    );
}

export default SavedMovies;
