import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster_path, backdrop_path }) {
    return (
        <div className="relative bg-cover bg-center rounded-lg shadow-lg text-white p-6 m-6" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})` }}>
            <img className="rounded-lg mb-4" src={`https://image.tmdb.org/t/p/w154${poster_path}`} alt={title} />
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <Link to={`/movies/${id}`} className="inline-block mt-4 px-6 py-2 bg-black bg-opacity-70 rounded hover:bg-opacity-90 transition">
                Saber mais
            </Link>
        </div>
    );
}
