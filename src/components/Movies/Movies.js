import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {movies} from '../../utils/movies';

function Movies() {
    return (
        <div className="movies">
            <SearchForm/>
            {/*<Preloader/>*/}
            <MoviesCardList movies={movies}/>
        </div>
    );
}

export default Movies;
