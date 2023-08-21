import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {moviesSave} from "../../../utils/moviesSave";
import Main from "../Main";

function SavedMovies() {
    return (
        <Main>
            <div className="saved-movies">
                <MoviesCardList
                    // className={"saved-movies__list"}
                    movies={moviesSave}/>
            </div>
        </Main>
    );
}

export default SavedMovies;
