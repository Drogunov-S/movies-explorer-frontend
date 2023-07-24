import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <div className="App">
        APP start
        <Header/>
        <Main/>
        <Movies/>
        <SavedMovies/>
        <Footer/>
        APP end
    </div>
  );
}

export default App;
