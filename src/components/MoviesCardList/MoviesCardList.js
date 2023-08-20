import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({movies}) {
  return (
    <div className="movies-card-list">
      <div className={"movies-card-list__list"}>
        {movies.map((movie, i) => {
          // console.log(i);
          return (<MoviesCard
                key={i}
                movie={movie}
            />);
        })}
      </div>
      <div className={"movies-card-list__more"}>
        <button type={"button"} className={"movies-card-list__btn_type_add"}>Ещё</button>
        {/*<div className={"movies-card-list_empty-space"}></div>*/}
      </div>
    </div>
  );
}

export default MoviesCardList;
