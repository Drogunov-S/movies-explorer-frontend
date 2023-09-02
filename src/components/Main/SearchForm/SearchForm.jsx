import './SearchForm.css';

function SearchForm({className, onSearch, query, setQuery, cookieKey, onCheckbox}) {
    function handleChange(e) {
        const {name, value} = e.target;
        setQuery({
            ...query,
            [name]: value
        });
    }

    function handleCheckbox(e) {
        setQuery({...query, isShortFilms: e.target.checked});
        onCheckbox(e.target.checked);
    }

    function onSubmit() {
        localStorage.setItem(cookieKey, JSON.stringify(query));
        onSearch();
    }

    return (
        <section className={`search-form ${className}`}>
            <label htmlFor="search" placeholder='Фильм' className={"search-form__line"}>
                <input type="text" id={'search'} name={'query'} className="search-form__input"
                       placeholder="Фильм"
                       value={query.query}
                       onChange={handleChange}
                />
                <button type="button" className={"bnt search-form__btn"} onClick={onSubmit}>></button>
            </label>
            <label className={"search-form__options"}>
                <input type="checkbox" name={'isShortFilms'} onChange={handleCheckbox} checked={query.isShortFilms}
                       className={" search-form__input-hidden"}/>
                <span className={`search-form__pseudo-checkbox`}/>
                <span className={"search-form__text"}>Короткометражки</span>
            </label>
        </section>
    );
}

export default SearchForm;
