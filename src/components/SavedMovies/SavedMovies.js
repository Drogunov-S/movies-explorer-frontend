import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies() {
  return (
    <div className="">
        SavedMovies starts
        <MoviesCardList/>
        <MoviesCard/>
        SavedMovies ends
    </div>
  );
}

export default SavedMovies;
