import React, { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import MovieItem from "../components/MovieItem";
import Footer from "../components/Footer";
import DarkMode from "../components/Darkmode";
// import { useNavigate } from 'react-router-dom';

interface Movie{
   id: number;
   url: string;
   title: string;
   year: number;
   rating: number;
   genres: string[];
   large_cover_image: string;
}

const Browse: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);//Movie => type specify gareko
  const [page, setPage] = useState(1);//current page track ma rakhna
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // const navigate = useNavigate();
  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery]);
const fetchMovies = async () => {
try{
  let apiUrl = `https://yts.mx/api/v2/list_movies.json?page=${page}`;
  if(searchQuery){
    apiUrl += `&query_term=${encodeURIComponent(searchQuery)}`;
  }
  const response = await axios.get(apiUrl);
   
       if (response.data && response.data.data && response.data.data.movies) {
          setMovies(response.data.data.movies);
          setTotalPages(Math.ceil(response.data.data.movie_count / 20));
        }
      }
  catch(error){
    console.log("Error fetching movies:", error);
  }
};
  const handlePrevPage = () => {
   if (page > 1) {
     setPage(page - 1);
   }
 };

 const handleNextPage = () => {
   setPage(page + 1);
 };

 const handlePageClick = (pageNumber: number) => {
   setPage(pageNumber);

 };
 const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(event.target.value);
};
 const renderPageNumbers = () => {
   const maxPages = 8 // Maximum 8 clickable pages
   const halfMaxDisplayedPages = Math.floor(maxPages / 2);
   let startPage = Math.max(1, page - halfMaxDisplayedPages);
   let endPage = Math.min(totalPages, page + halfMaxDisplayedPages);

   if (endPage - startPage + 1 < maxPages) {
    if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPages - 1);
    } else {
        startPage = Math.max(1, endPage - maxPages + 1);
    }
}

   const pageNumbers = [];
   if (page !== 1) {
    pageNumbers.push(
        <button
            key="previous"
            className="mx-1 p-2 hover:bg-ytsthemecolor px-4  border rounded-md"
            onClick={() => handlePageClick(page - 1)}
        >
            Previous
        </button>
    );
}
   for (let i = startPage; i <= endPage; i++) {
     pageNumbers.push(
       <button
         key={i}
         className={`mx-1 p-2  ${
           page === i ? "  px-4 hover:bg-ytsthemecolor border bg-ytsthemecolor" : " hover:bg-ytsthemecolor px-4 border hover:text-white"
         } rounded-md`}
         onClick={() => handlePageClick(i)}
       >
         {i}
       </button>
     );
   }
   return pageNumbers;
 };
 const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  fetchMovies(); // Fetch movies based on the search query
};
  return (
    <>
    <DarkMode>
      <Header />
      <h1 className=" px-72 font-bold text-2xl text-gray-400">  Search Term:</h1>
      <form className="flex gap-7 px-72 py-3" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        className="flex border p-2 rounded-md w-full focus:outline-none text-black"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <button type="submit" className="bg-ytsthemecolor  p-2 rounded-md font-bold px-5">Search</button>
    </form>
<h1 className="text-ytsthemecolor  p-2 text-center text-2xl">YIFY Movies</h1>
      {/* Pagination start */}
      <div className="flex justify-center py-4 ">
        {renderPageNumbers()}
        <button
          onClick={handleNextPage}
          className=" hover:bg-ytsthemecolor  font-bold py-2 px-4 mx-2 rounded"
        >
          Next
        </button>
      </div>
      {/* Pagination end */}

      <div className="gap-4   justify-center items-center flex flex-wrap px-24">
        {movies.map((movie: Movie) => (
          <MovieItem key={movie.id} movie={movie}/>
        ))}
      </div>

       {/* Pagination start */}
       <div className="flex justify-center py-4  ">
        {renderPageNumbers()}
        <button
          onClick={handleNextPage}
          className=" hover:bg-ytsthemecolor font-bold py-2 px-4 mx-2 rounded"
        >
          Next
        </button>
      </div>
      {/* Pagination end */}
      <Footer/>
      </DarkMode>
    </>
  );
};

export default Browse;
