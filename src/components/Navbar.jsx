import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaAngleDown, FaBars, FaChevronRight, FaUser, FaPlus } from "react-icons/fa6";
import { PiBellRingingFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import useLocalStore from "../store/useLocalStorage";
import AddCategoryDrawer from "./AddCategoryDrawer";

const categoryFields = [{ id: 1, type: "text", name: "category_name", placeholder: "Category goes here..." }]

const Navbar = () => {

    const { categories, addCategory, setSearchQuery, searchQuery } = useLocalStore()
    const [isOpen, setIsOpen] = useState(false)

    const path = useLocation().pathname
    const [menuOpen, setMenuOpen] = useState(false);

    function submitHandler(category_name) {
        console.log("category data", category_name)
        addCategory(category_name)
    }
   


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="stranverse-nav flex flex-col md:flex-row justify-between items-center text-slate-200 px-6 py-3">
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
            {/* Mobile section */}
            <div className="lg:hidden flex justify-between items-center w-full md:w-auto">
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <FaBars size={24} />
                </button>
                <Link to="/" className="flex items-center gap-2 font-extrabold text-lg tracking-wide">
                    <span className="text-neon">Stran</span>Verse
                </Link>
            </div>

            {/* Desktop brand */}
            <Link to="/" className="hidden md:flex items-center gap-2 font-extrabold text-xl tracking-wide ml-2">
                <span className="text-neon">Stran</span>Verse
            </Link>

            {/* Left Section: Logo + Links */}
            <div className={`${menuOpen ? "flex" : "hidden"} flex-col md:flex md:flex-row md:pl-10 gap-4 md:gap-6 font-medium md:mt-0`}>
                <div className="flex items-center gap-3">
                    <Link to="/" className={`stranverse-link ${path === '/' ? 'is-active' : ''}`}>Home</Link>
                    <FaChevronRight className="text-slate-600" />
                </div>
                <Link to="/dashboard" className={`stranverse-link ${path === '/dashboard' ? 'is-active' : ''}`}>Dashboard V2</Link>
            </div>



            <div className={`${menuOpen ? "flex-col space-y-2.5" : "hidden"} md:flex md:pr-10 md:gap-20 md items-center mt-5 md:mt-0`}>
                <div >
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search anything..."
                            className="glass-input pl-8 pr-3 py-2 w-110 rounded-md"
                        />
                        <IoSearch className="absolute left-2 top-2.5 text-slate-400" size={20} />
                    </div>


                </div>
                <div
                    onClick={() => setIsOpen(true)}
                    className="flex items-center justify-center mt-1 gap-2 cursor-pointer text-slate-400 hover:text-sky-300">
                    <span>Add Category
                    </span>
                    <FaPlus />
                </div>

                <div className="flex justify-center gap-5 md:gap-10 ">
                    <button className="cursor-pointer p-1.5 text-slate-400 hover:text-sky-300 md:mt-1.5">
                        <PiBellRingingFill size={22} />
                    </button>
                    <div className="cursor-pointer p-1.5 md:mt-1.5 text-slate-400 hover:text-sky-300 ">
                        <FaAngleDown />
                    </div>
                    {/* User Dropdown */}
                    <div className="flex items-center gap-1 cursor-pointer md:mt-1.5 bg-slate-700 rounded-full p-1.5 text-slate-200 hover:text-sky-300 ">
                        <FaUser size={20} />

                    </div>
                </div>
            </div>


            <AddCategoryDrawer
                isOpen={isOpen}
                category={categories}
                fields={categoryFields}
                onClose={() => setIsOpen(false)}
                title={"Add Category"}
                subtitle={"Personalize your dashboard by adding the category"}
                onSubmit={submitHandler}
            />
        </nav>
    );
};

export default Navbar;
