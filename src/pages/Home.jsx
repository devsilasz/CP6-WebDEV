import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const [filmesPopulares, setFilmesPopulares] = useState([]);
    const [filmesTrending, setFilmesTrending] = useState([]);
    const [filmesUpcoming, setFilmesUpcoming] = useState([]);
    const [indexPopulares, setIndexPopulares] = useState(0);
    const [indexTrending, setIndexTrending] = useState(0);
    const [indexUpcoming, setIndexUpcoming] = useState(0);
    const filmesPorVisao = 5; // Quantidade de filmes visíveis por vez

    const fetchMovies = async () => {
        try {
            const [respostaPopulares, respostaTrending, respostaUpcoming] = await Promise.all(
                [
                    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`),
                    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&language=pt-br`)
                ]
            );

            const popularData = await respostaPopulares.json();
            const trendingData = await respostaTrending.json();
            const upcomingData = await respostaUpcoming.json();

            setFilmesPopulares(popularData.results);
            setFilmesTrending(trendingData.results);
            setFilmesUpcoming(upcomingData.results);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleNext = (setIndex, filmes, index) => {
        if (index + filmesPorVisao < filmes.length) {
            setIndex(index + 1);
        }
    };

    const handlePrevious = (setIndex, index) => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    return (
        <section className="container mx-auto p-4 space-y-8">
            {/* Populares */}
            <CardContainer titulo="Populares">
                <div className="flex items-center justify-between space-x-4 py-2">
                    <button
                        onClick={() => handlePrevious(setIndexPopulares, indexPopulares)}
                        className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                    >
                        ←
                    </button>
                    <div className="flex space-x-4 overflow-x-auto">
                        {filmesPopulares.slice(indexPopulares, indexPopulares + filmesPorVisao).map(filme => (
                            <div className="flex-shrink-0 w-48" key={filme.id}>
                                <MovieCard {...filme} />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => handleNext(setIndexPopulares, filmesPopulares, indexPopulares)}
                        className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                    >
                        →
                    </button>
                </div>
            </CardContainer>

            {/* Trending da Semana */}
            <CardContainer titulo="Trending da Semana">
                <div className="flex items-center justify-between space-x-4 py-2">
                    <button
                        onClick={() => handlePrevious(setIndexTrending, indexTrending)}
                        className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                    >
                        ←
                    </button>
                    <div className="flex space-x-4 overflow-x-auto">
                        {filmesTrending.slice(indexTrending, indexTrending + filmesPorVisao).map(filme => (
                            <div className="flex-shrink-0 w-48" key={filme.id}>
                                <MovieCard {...filme} />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => handleNext(setIndexTrending, filmesTrending, indexTrending)}
                        className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                    >
                        →
                    </button>
                </div>
            </CardContainer>

            {/* Filmes que Estão por Vir */}
            <CardContainer titulo="Filmes que Estão por Vir">
                <div className="flex items-center justify-between space-x-4 py-2">
                    <button
                        onClick={() => handlePrevious(setIndexUpcoming, indexUpcoming)}
                        className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                    >
                        ←
                    </button>
                    <div className="flex space-x-4 overflow-x-auto">
                        {filmesUpcoming.slice(indexUpcoming, indexUpcoming + filmesPorVisao).map(filme => (
                            <div className="flex-shrink-0 w-48" key={filme.id}>
                                <MovieCard {...filme} />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => handleNext(setIndexUpcoming, filmesUpcoming, indexUpcoming)}
                        className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                    >
                        →
                    </button>
                </div>
            </CardContainer>
        </section>
    );
}
