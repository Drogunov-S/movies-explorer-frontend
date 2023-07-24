import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function Movies() {
    return (
        <div className="">
            Movies start
            <SearchForm/>
            <Preloader/>
            <MoviesCardList/>
            <MoviesCard/>
            Movies end
        </div>
    );
}

export default Movies;
