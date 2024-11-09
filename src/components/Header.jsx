import { useState } from "react";
import { NavLink } from "react-router-dom";
import Login from "./Login";

export default function Header() {
    const [isLogged, setIsLogged] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Para controlar o menu mobile

    const handleLogin = () => {
        setIsLogged(!isLogged);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-pink-900 text-white">
            {/* Container principal */}
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div>
                    <h1 className="font-bold text-xl">Portal Filmes</h1>
                </div>

                {/* Menu de navegação */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        <li>
                            <NavLink
                                to="/"
                                className="hover:text-yellow-300 transition-colors"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/movies"
                                className="hover:text-yellow-300 transition-colors"
                            >
                                Filmes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/genre"
                                className="hover:text-yellow-300 transition-colors"
                            >
                                Gêneros
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contato"
                                className="hover:text-yellow-300 transition-colors"
                            >
                                Contato
                            </NavLink>
                        </li>
                        {isLogged && (
                            <li>
                                <NavLink
                                    to="/settings"
                                    className="hover:text-yellow-300 transition-colors"
                                >
                                    Configurações
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Botão Login e Menu Hamburguer */}
                <div className="flex items-center space-x-4">
                    <Login isLogged={isLogged} handleLogin={handleLogin} />

                    {/* Menu hamburguer para dispositivos móveis */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menu mobile */}
            {isOpen && (
                <div className="md:hidden bg-purple-700 px-4 py-2">
                    <ul className="space-y-4">
                        <li>
                            <NavLink
                                to="/"
                                className="block hover:text-yellow-300 transition-colors"
                                onClick={toggleMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/movies"
                                className="block hover:text-yellow-300 transition-colors"
                                onClick={toggleMenu}
                            >
                                Filmes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/genre"
                                className="block hover:text-yellow-300 transition-colors"
                                onClick={toggleMenu}
                            >
                                Gêneros
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contato"
                                className="block hover:text-yellow-300 transition-colors"
                                onClick={toggleMenu}
                            >
                                Contato
                            </NavLink>
                        </li>
                        {isLogged && (
                            <li>
                                <NavLink
                                    to="/settings"
                                    className="block hover:text-yellow-300 transition-colors"
                                    onClick={toggleMenu}
                                >
                                    Configurações
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
}
