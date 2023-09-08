import './MoviesCard.css';
import {Link} from "react-router-dom";
import {getPageName, getStringTime} from "../../../utils/utility";
import {ELEMENTS_NAME} from "../../../config/constant";


function MoviesCard({
                        movie
                        , onSave
                        , onDelete
                    }) {

    const alt = movie.nameRU;
    const link = movie.image;
    const isSave = Boolean(movie._id);
    const typeIconSave = getPageName() === ELEMENTS_NAME.movies ? 'movie-card__like_active' : 'movie-card__remove'

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
                    className={`${isSave ? `movie-card__like ${typeIconSave}` : 'movie-card__like'}`}
                    type="button"
                    onClick={isSave ? handleDelete : handleSave}
                />
            </div>
        </article>
    );
}

export default MoviesCard;
