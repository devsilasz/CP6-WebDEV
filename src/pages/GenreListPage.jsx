import { Link, Outlet } from "react-router-dom";

const genres = [
    { id: 28, name: "Filmes de Ação", color: "bg-red-500" },
    { id: 35, name: "Filmes de Comédia", color: "bg-yellow-500" },
    { id: 18, name: "Filmes de Drama", color: "bg-purple-500" },
    { id: 12, name: "Filmes de Aventura", color: "bg-green-500" },
    { id: 16, name: "Filmes de Animação", color: "bg-blue-500" },
    // Adicione mais gêneros conforme necessário
];

export default function GenreListPage() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Página de Gêneros</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {genres.map((genre) => (
                    <Link
                        key={genre.id}
                        to={`/genres/${genre.id}`}
                        className={`p-4 rounded-lg text-white ${genre.color} hover:opacity-80 transition`}
                    >
                        {genre.name}
                    </Link>
                ))}
            </div>
            <Outlet />
        </div>
    );
}
