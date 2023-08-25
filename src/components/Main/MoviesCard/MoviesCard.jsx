import './MoviesCard.css';
import {useLocation} from "react-router-dom";

// import

function MoviesCard({movie}) {
    const pathname = useLocation().pathname;



    // console.log(key);
    // console.log(movie);
    return (
        <article className="movie-card">
            <img className="movie-card__image" src={movie.link} alt={movie.name}
                // onClick={onImagemovie-cardClick}
            />
            {/*{isOwner && (<button className="movie-card__btn_type_trash" onClick={onmovie-cardDeleteClick} type="button"/>)}*/}
            <div className="movie-card__info">
                <div className={"movie-card__wrapper"}>
                    <h2 className="movie-card__caption">{movie.name}</h2>
                    <span className={"movie-card__timing"}>{movie.timing}</span>
                </div>
                {/*<div className="movie__wrapper-like">*/}
                    <button
                        className={`${pathname === '/saved-movies' ? 'movie-card__remove' : 'movie-card__like movie-card__like_active'}`}
                        type="button"
                        // onClick={onmovie-cardLikeClick}
                    />
                    {/*<span className="movie-card__like-counter">{card.likes.length}</span>*/}
                {/*</div>*/}
            </div>
        </article>
    );
}

export default MoviesCard;
