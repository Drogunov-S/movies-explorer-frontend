import {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {getMoviesCardSizer} from "../../../utils/utility";
import {useLocation} from "react-router-dom";

function MoviesCardList({movies, className}) {
    const cardSizer = useCardsSizer();
    const pathname = useLocation().pathname;
    if (window.innerWidth < 340 && pathname === '/saved-movies') {
        console.log()
        movies = movies.slice(0, 2);
    }
    function useCardsSizer() {

        const [cardSizer, setCardSizer] = useState(getMoviesCardSizer(window.innerWidth));
        useEffect(() => {

            function handleResize() {
                setCardSizer(getMoviesCardSizer(window.innerWidth));
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);
        return cardSizer;
    }


    return (
        <div className={`movies-card-list ${className}`}>
            <div className={"movies-card-list__list"}>
                {movies.slice(0, cardSizer.max).map((movie, i) => {
                    return (<MoviesCard key={i}
                        movie={movie}
                    />);
                })}
            </div>
            {movies.length > cardSizer.max && <div className={"movies-card-list__more"}>
                <button type={"button"} className={"bnt movies-card-list__btn-add"}>Ещё</button>
                {/*<div className={"movies-card-list_empty-space"}></div>*/}
            </div>}
        </div>
    );
}

export default MoviesCardList;
