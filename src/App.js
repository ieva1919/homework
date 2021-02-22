import './App.scss';
import { VscLoading } from 'react-icons/vsc';
import { makeRequest } from './Api'
import { useEffect, useState } from 'react';
import movie from './icons/movie.svg';
import search from './icons/search.svg';

function App() {

  const [movieName, setMovieName] = useState('')
  const [movies, setMovies] = useState([])
  // console.log(movies)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [loading, setLoading] = useState(false)

  const debouncedMovie = useDebounced(movieName, 500)

  useEffect(() => {
    if (debouncedMovie.length > 2) {
      setLoading(true)
      makeRequest(debouncedMovie)
        .then(data => {
          setMovies(data.results.slice(0, 8))
          setLoading(false)
          setShowErrorMessage(data.results.length === 0)
        })
    } else {
      setMovies([])
      setShowErrorMessage(false)
    }
}, [debouncedMovie])

function useDebounced(value, timeout) {
  let [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, timeout)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, timeout])
  return debouncedValue
}


 function handleChange(e) {
    setMovieName(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Background-header">
          <div className="movie-icon"><img src={movie} alt="movie" /></div>
          <input type="text" id="movie" name="movie" value={movieName} onChange={handleChange} autoComplete="off"/>
          <div className={`label ${movieName ? "showText" : " "}`}>Enter movie name </div>
        </div>
        <div className="search-icon"><img src={search} alt="movie" /> </div>
        { movies.length > 0 &&
          <div className="inputText"> 
          {movies.map(movie => (
            <p className="paragraph" key={movie.id} onClick={ () => setMovieName(movie.original_title)}> 
            {movie.original_title} 
            <div className="paragraphSecondLine">{movie.vote_average} Rating, {movie.release_date.substr(0, 4)}</div></p>
          ))}
          </div> 
        }
      </header>
      { showErrorMessage &&
        <div className="errorMessage">The movie with this name was not found. Please check and try again.</div>
      }
      { loading &&
        <div className="loading"><VscLoading/></div>
      }
    </div>
  );
}


export default App;
