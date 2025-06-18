import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar.tsx";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import type {Movie} from "../../types/movie.ts";
import * as movieService from '../../services/movieService.ts'
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";

function App() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isModalActive, setIsModalActive] = useState(false)
    const [error, setError] = useState('')
    const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
    const handleSubmit = (formData: FormData) => {
        setMovies([])
        const query = formData.get("query") as string;
        if (!query.trim()) {
            toast.error('Please enter your search query')
            return
        }

        setLoading(true);
        setError("")

        movieService.fetchMovie(query).then(data => {
            if (!data.results.length) {
                toast.error('No movies found for your request')
            }
            setMovies(data.results);
        }).catch(e => {
            setError(e.message)
        }).finally(() => setLoading(false))
    };

    function onSelect(movie: Movie): void {
        setCurrentMovie(movie)
        setIsModalActive(true)
    }

    function onClose() {
        setIsModalActive(false)
        setCurrentMovie(null)
    }

    useEffect(() => {
        if (isModalActive) {
            document.body.classList.add('hidden')
        } else {
            document.body.classList.remove('hidden')
        }
    }, [isModalActive]);


    if (error) {
        return (
            <>
                <SearchBar onSubmit={handleSubmit}/>
                {loading ? (<Loader/>) : (<ErrorMessage message={error}/>)}
                <Toaster position="top-center"/>
            </>
        )
    }

    return (
        <>
            <SearchBar onSubmit={handleSubmit}/>
            {loading ? (<Loader/>) : (<MovieGrid
                movies={movies}
                onSelect={onSelect}
            />)}
            {isModalActive && (
                <MovieModal
                    movie={currentMovie}
                    onClose={onClose}
                />)}
            <Toaster position="top-center"/>
        </>
    )
}

export default App
