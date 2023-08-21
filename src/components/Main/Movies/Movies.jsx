import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {movies} from '../../../utils/movies';
import Main from "../Main";

function Movies() {
    return (
        <Main>
            <div className="movies">
                <SearchForm/>
                {/*<Preloader/>*/}
                <MoviesCardList movies={movies}/>
            </div>
        </Main>
    );
}

export default Movies;
