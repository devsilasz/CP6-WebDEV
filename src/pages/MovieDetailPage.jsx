import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // Fetching movie details
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`
                );
                const data = await response.json();
                setMovie(data);

                // Fetching movie trailer
                const trailerResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`
                );
                const trailerData = await trailerResponse.json();
                const officialTrailer = trailerData.results.find(
                    (video) => video.type === 'Trailer'
                );
                setTrailer(officialTrailer ? officialTrailer.key : null);
            } catch (error) {
                setError('Erro ao carregar os detalhes do filme');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold">{movie.title}</h1>

            <div className="flex space-x-4">
                <div className="w-64">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-lg"
                    />
                </div>
                <div className="flex-1">
                    <p className="text-xl font-semibold">{movie.overview}</p>
                    <p className="mt-2">Data de lançamento: {movie.release_date}</p>
                    <p className="mt-2">Avaliação: {movie.vote_average} / 10</p>

                    {/* Exibindo o elenco */}
                    <h3 className="mt-4 text-2xl font-semibold">Elenco:</h3>
                    <ul className="mt-2">
                        {movie.cast && movie.cast.slice(0, 5).map((actor) => (
                            <li key={actor.id}>{actor.name} como {actor.character}</li>
                        ))}
                    </ul>

                    {/* Trailer */}
                    {trailer && (
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">Trailer</h3>
                            <iframe
                                width="100%"
                                height="400"
                                src={`https://www.youtube.com/embed/${trailer}`}
                                title="Trailer"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
