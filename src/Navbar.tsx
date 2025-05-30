import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {GiFullPizza} from "react-icons/gi";
import {Menu, X} from "lucide-react";

export function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const textClassProperties: string = "transition duration-500 font-medium";

    const navLinks = (
        <>
            <li>
                <Link
                    to="/pages/VotePizza"
                    className={
                        location.pathname === "/pages/VotePizza"
                            ? (menuOpen ? "text-black " + textClassProperties : "text-black underline underline-offset-18 decoration-black " + textClassProperties)
                            : "text-gray-500 hover:text-red-700 " + textClassProperties
                    }
                >
                    Volit pizzy
                </Link>
            </li>
            <li>
                <Link
                    to="/pages/AddPizza"
                    className={
                        location.pathname === "/pages/AddPizza" || location.pathname === "/"
                            ? (menuOpen ? "text-black " + textClassProperties : "text-black underline underline-offset-18 decoration-black" + textClassProperties)
                            : "text-gray-500 hover:text-red-700 " + textClassProperties
                    }
                >
                    Přidat pizzu
                </Link>
            </li>
            <li>
                <Link
                    to="/pages/ResultSummary"
                    className={
                        location.pathname === "/pages/ResultSummary"
                            ? (menuOpen ? "text-black " + textClassProperties : "text-black underline underline-offset-18 decoration-black " + textClassProperties)
                            : "text-gray-500 hover:text-red-700 " + textClassProperties
                    }
                >
                    Výsledky
                </Link>
            </li>
        </>
    );

    return (
        <nav className="bg-amber-300 p-3">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
                <div className="text-black font-bold text-xl flex items-center gap-1">
                    <GiFullPizza className="text-xl" />
                    PizzaVoter
                </div>
                {/* Hamburger for mobile */}
                <button
                    className="sm:hidden ml-auto text-black"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    {menuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
                {/* Desktop menu */}
                <ul className="hidden sm:flex flex-row space-x-4 mt-2 sm:mt-0">{navLinks}</ul>
            </div>
            {/* Mobile menu (accordion style) */}
            {menuOpen && (
                <ul className="sm:hidden flex flex-col space-y-2 mt-2 bg-amber-200 rounded shadow p-4 animate-slide-down">
                    {navLinks}
                </ul>
            )}
        </nav>
    );
}