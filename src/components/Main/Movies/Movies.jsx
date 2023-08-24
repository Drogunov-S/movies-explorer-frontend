import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {movies} from '../../../utils/movies';
import Main from "../Main";

function Movies() {
    return (
        <Main>
            <section className="movies">
                <SearchForm className={'movies__search-form'}/>
                {/*<Preloader/>*/}
                <MoviesCardList movies={movies} className={'movies__card-list'}/>
            </section>
        </Main>
    );
}

export default Movies;
