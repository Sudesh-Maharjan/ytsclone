import React from 'react'
import { useEffect, useState } from "react"
import Header from "../components/Header"
import axios from "axios"
import MovieItem from '../components/MovieItem';
import Footer from '../components/Footer';
import DarkMode from '../components/Darkmode';
// import { useNavigate } from 'react-router-dom';
interface Movie{
  id: number;
  url: string;
  title: string;
  year: number;
  rating: number;
  genres: string[];
  large_cover_image: string;
  date_uploaded_unix: number;
}
const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);//Movie => type specify gareko
  // const [page, setPage] = useState(1);//current page track ma rakhna
  // const navigate = useNavigate();
  // const [darkMode, setDarkMode] = useState<boolean>(
  //   localStorage.getItem('darkMode') === 'true' 
  // );
   useEffect(() => {
      axios.get(`https://yts.mx/api/v2/list_movies.json`)
      .then((res) =>{
    if(res.data && res.data.data  && res.data.data.movies) {
      const sortedMovies = res.data.data.movies.sort((a: Movie,b: Movie) => {
        return b.year - a.year;
      });
      setMovies(sortedMovies);
    }
  }
   )
   .catch((error) => {
    console.log("Error fetching latest movies:", error)
   });
   },[]);
  //  const toggleTheme = () => {
  //   setDarkMode(!darkMode);
  // };

  //  const handleMovieClick = (movieId: number) => {
  //   navigate(`/details/${movieId}`);
  // };
  return (
    <>
    {/* <div className={`min-h-screen ${darkMode ? 'bg-dark text-white': 'bg-light'}`}> */}
    <DarkMode>
    <Header/>

<h2 className=" rounded-md  font-bold px-40 py-4">Latest YIFY Movies Torrents</h2>  
<div className="gap-4 justify-center items-center flex flex-wrap px-24">
  {
    movies.map((movie: Movie) => (
      <MovieItem key={movie.id} movie={movie}/>
    ))
  }
</div>


<Footer/>
</DarkMode>
{/* <button
        className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={toggleTheme}
      >
        {darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      </button> */}
{/* </div> */}
    </>
  )
}

export default Home
