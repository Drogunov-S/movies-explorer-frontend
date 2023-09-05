import {useEffect, useState} from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {getMoviesCardSizer} from "../../../utils/utility";
import {useLocation} from "react-router-dom";
import {ROUTES} from "../../../config/constant";

function MoviesCardList({movies, className, onSaveMovie, onDeleteMovie, error}) {
    const [cardSizer, setCardSizer] = useState(useCardsSizer());
    const {pathname} = useLocation();

    function useCardsSizer() {
        const sizer = getMoviesCardSizer(window.innerWidth);
        useEffect(() => {
            function handleResize() {
                const moviesCardSizerDefault = getMoviesCardSizer(window.innerWidth);
                setCardSizer({
                    ...moviesCardSizerDefault,
                    max: Math.floor(cardSizer.max / moviesCardSizerDefault.columns) * moviesCardSizerDefault.columns
                });
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        return sizer;
    }

    const useAddedMoreCard = () => {
        const newMax = cardSizer.max += cardSizer.addsCard;
        setCardSizer({...cardSizer, max: newMax});
    }

    return (
        <div className={`movies-card-list ${className}`}>
            <div className={"movies-card-list__list"}>
                {error.isError && <span className={'movies-card-list__error'}>{error.message}</span>}
                {movies.map((movie, counter) => {
                    if (counter < cardSizer.max) {
                        return (<MoviesCard key={pathname === ROUTES.movies ? movie.id : movie._id}
                                            movie={movie}
                                            onSave={onSaveMovie}
                                            onDelete={onDeleteMovie}
                        />);
                    }
                })}
            </div>
            {movies.length > cardSizer.max && <div className={"movies-card-list__more"}>
                <button
                    onClick={useAddedMoreCard}
                    type={"button"}
                    className={"bnt movies-card-list__btn-add"}>Ещё
                </button>
            </div>}
        </div>
    );
}

export default MoviesCardList;
