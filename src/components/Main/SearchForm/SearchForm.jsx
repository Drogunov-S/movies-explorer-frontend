import './SearchForm.css';

function SearchForm({className}) {
    return (
        <search className={`search-form ${className}`}>
            <label htmlFor="search" placeholder='Фильм' className={"search-form__line"}>
                <input type="text" id={'search'} name={'search'} className="search-form__input"
                       placeholder="Фильм"
                />
                <button type="button" className={"bnt search-form__btn"}>></button>
            </label>
            <label className={"search-form__options"}>
                <input type="checkbox" className={"search-form__input-hidden"}/>
                <span className={"search-form__pseudo_checkbox"} />
                <span className={"search-form__text"}>Короткометражки</span>
            </label>
        </search>
    );
}

export default SearchForm;
