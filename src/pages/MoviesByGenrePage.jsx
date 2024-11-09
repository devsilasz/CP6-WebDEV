import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MoviesByGenrePage() {
    const { genreId } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Substitua pela sua lógica de busca de filmes por gênero
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=${genreId}`)
            .then(response => response.json())
            .then(data => setMovies(data.results));
    }, [genreId]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Filmes do Gênero</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="p-4 bg-gray-800 rounded-lg text-white">
                        <img src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} alt={movie.title} className="mb-2 rounded-lg" />
                        <h3 className="text-xl font-bold">{movie.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
