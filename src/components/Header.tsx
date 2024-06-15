import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";

interface Movie {
  id: number;
  medium_cover_image: string;
  title: string;
  year: number;
}

// Define component props
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  //search state useState
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      searchMovies(e.target.value);
    } else {
      setSearchResults([]);
    }
  };

  const searchMovies = async (query: string) => {
    try {
      const response = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${encodeURIComponent(
          query
        )}`
      );
      if (response.data && response.data.data && response.data.data.movies) {
        setSearchResults(response.data.data.movies);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  // console.log(undefined.someProperty);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setSearchResults([]);
      }
    };
  
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <>
      <nav className="border-gray-200 dark:border-gray-700  sticky top-0 z-40 border-b-2 bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex gap-1">
            <a
              href="/"
              className="flex items-center px-5 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://yts.mx/assets/images/website/logo-YTS.svg"
                className="h-8"
                alt="YTS"
              />
            </a>

            <span className="text-start text-xl text-gray-400 whitespace-nowrap dark:text-white">
              HD movies at the smallest file size
            </span>
          </div>
          <div className="flex items-center flex-col relative">
            <div className="flex items-center justify-center rounded-full border border-gray-500">
              <IoSearchSharp className="text-xl m-2 text-white" />
              <input
               ref={searchRef}
                type="text"
                placeholder="Quick Search"
                className="w-[250px] py-2 px-4  bg-black text-white focus:outline-none "
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchResults.length > 0) {
                    e.preventDefault();
                    window.location.href = `/details/${searchResults[0].id}`;
                  }
                }}
              />
            </div>
            <div className="absolute  max-h-60 w-full top-14 shadow-lg">
              <ul className="">
                {searchResults.slice(0, 5).map((movie) => (
                  <div className="border-b p-2 bg-black border-gray-700 hover:bg-gray-700 ">
                    <li key={movie.id}>
                      <Link
                        to={`/details/${movie.id}`}
                        className="text-gray-400 hover:text-white flex justify-start"
                        onClick={() => setSearchResults([])}
                      >
                        <img
                          src={movie.medium_cover_image}
                          alt={movie.title}
                          className="w-11 h-14"
                        />
                        <div className="">
                          <div className="text-xs p-2 text-white font-bold">
                            {movie.title}
                          </div>
                          <div className="text-xs p-2">{movie.year}</div>
                        </div>
                      </Link>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-multi-level"
          >
            <ul className="flex flex-col text-gray-400 text-sm  font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 px- rounded md:bg-transparent md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent hover:text-white hover:transition duration-1000"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/browseMovies"
                  className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-white-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-white hover:transition duration-1000"
                >
                  Browse Movies
                </a>
              </li>
              <li>
                {/* <button
               
                  className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-white-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent hover:text-white hover:transition duration-1000"
                >
                  <FontAwesomeIcon icon={faMoon} /> Dark Mode
                </button> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
