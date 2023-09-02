import './MoviesCard.css';
import {Link} from "react-router-dom";
import {getStringTime} from "../../../utils/utility";


function MoviesCard({movie, onSave, onDelete}) {
    const alt = movie.nameRU;
    const link = movie.image;
    const isSave = Boolean(movie._id);

    function handleSave() {
        onSave(movie);
    }

    function handleDelete() {
        onDelete(movie);
    }

    return (
        <article className="movie-card">
            <Link target={"_blank"} to={movie.trailerLink} className={'movie-card__trailer-link'}>
                <img className="movie-card__image" src={`${link}`} alt={alt}/>
            </Link>
            <div className="movie-card__info">
                <div className={"movie-card__wrapper"}>
                    <h2 className="movie-card__caption">{movie.nameRU}</h2>
                    <span className={"movie-card__timing"}>{getStringTime(movie.duration)}</span>
                </div>
                <button
                    className={`${isSave ? 'movie-card__remove' : 'movie-card__like movie-card__like_active'}`}
                    type="button"
                    onClick={isSave ? handleDelete : handleSave}
                />
            </div>
        </article>
    );
}

export default MoviesCard;
