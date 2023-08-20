import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {moviesSave} from "../../utils/moviesSave";

function SavedMovies() {
  return (
    <div className="saved-movies">
        <MoviesCardList
            // className={"saved-movies__list"}
            movies={moviesSave}/>
    </div>
  );
}

export default SavedMovies;
