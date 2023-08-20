import './SearchForm.css';

function SearchForm() {
    return (
        <div className="search-form">
            <label htmlFor="search" placeholder='Фильм' className={"search-form__line"}>
                <input type="text" id={'search'} name={'search'} className="search-form__input"
                       placeholder="Фильм"
                />
                <button type="button" className={"search-form__btn"}>></button>
            </label>
            <label className={"search-form__options"}>
                <input type="checkbox" className={"search-form__input-hidden"}/>
                <span className={"search-form__pseudo_checkbox"} />
                <span className={"search-form__text"}>Короткометражки</span>
            </label>
        </div>
    );
}

export default SearchForm;
