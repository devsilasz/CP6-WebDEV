import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function MovieListPage() {
    const [search, setSearch] = useState("");
    const [filmes, setFilmes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Função para carregar os filmes populares
    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-br`);
                const data = await response.json();
                setFilmes(data.results);
            } catch (error) {
                console.error("Erro ao carregar os filmes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    // Função de busca
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filmesFiltrados = filmes.filter(filme =>
        filme.title.toLowerCase().includes(search.toLowerCase())
    );

    // Exibindo o resultado de busca
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Veja o catálogo completo de filmes</h2>
            
            {/* Barra de pesquisa */}
            <input
                className="w-full p-2 border rounded-lg mb-6"
                type="text"
                id="search"
                placeholder="Digite o nome do filme"
                value={search}
                onChange={handleSearch}
            />
            
            {/* Exibição dos filmes */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    isLoading ? <p>Carregando...</p> :
                        filmesFiltrados.length > 0 ?
                            filmesFiltrados.map(filme => (
                                <MovieCard key={filme.id} {...filme} />
                            )) :
                            <p>Filme não encontrado</p>
                }
            </section>
        </div>
    );
}
