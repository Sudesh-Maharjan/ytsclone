import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaHeart, FaImdb } from "react-icons/fa";
import { AiOutlineDownload } from "react-icons/ai";
import DarkMode from "../components/Darkmode";

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genres: string[];
  large_cover_image: string;
  background_image: string;
  summary: string;
  description_intro: string;
  language: string;
  yt_trailer_code: number;
  like_count: number;
  torrents: Torrent[];
  small_cover_image: string;
  medium_screenshot_image1: string;
  medium_screenshot_image2: string;
  medium_screenshot_image3: string;
  date_uploaded: number;
  cast: string;
}
interface Torrent {
  quality: string;
}
const Details = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [suggestions, setSuggestions] = useState<Movie[]>([]);

  //trailer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState("");

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(
            `https://yts.mx/api/v2/movie_details.json?movie_id=${parseInt(
              id
            )}&with_images=true&with_cast=true`
          );
          // Assuming the response.data contains the details of the movie
          setMovie(response.data.data.movie);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      };

      const fetchMovieSuggestions = async () => {
        try {
          const response = await axios.get(
            `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`
          );
          // Assuming the response.data contains the array of suggested movies
          setSuggestions(response.data.data.movies);
        } catch (error) {
          console.error("Error fetching movie suggestions:", error);
        }
      };

      fetchMovieDetails();
      fetchMovieSuggestions();
    }
  }, [id]);
  const openMedia = (media: string) => {
    setCurrentMedia(media);
    setIsModalOpen(true);
  };

  const closeMedia = () => {
    setIsModalOpen(false);
    setCurrentMedia("");
  };

  return (
    <>
      <DarkMode>
        <Header />
        {movie && (
          <div className="movie-details flex flex-col">
            <div className="flex">
              <div
                style={{
                  backgroundImage: `url('${movie.background_image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "700px",
                }}
              ></div>
              <div className="absolute left-52">
                <div className=" flex gap-10 mt-3 justify-center items-start  ">
                  <div className="m-5 p-3 flex flex-col">
                    <img
                      src={movie.large_cover_image}
                      alt={movie.title}
                      className="h-[400px] border-4 rounded-md"
                    />
                    <button className="bg-ytsthemecolor m-1 p-2 rounded-md text-white font-bold hover:bg-green-600 flex justify-center items-center gap-4">
                      <span className="text-2xl text-green-600 font-bold">
                        {" "}
                        <AiOutlineDownload />{" "}
                      </span>{" "}
                      Download
                    </button>
                    <button className="bg-watchnow m-1 p-2 rounded-md text-white font-bold ">
                      Watch Now
                    </button>
                  </div>
                  <div className="m-5 text-white p-3">
                    <h1 className="font-bold  text-4xl w-72">{movie.title}</h1>
                    <div className="flex gap-5">
                      <p className="font-bold  text-2xl mt-5">{movie.year}</p>{" "}
                      <span className="flex justify-center items-center font-bold">
                        [{movie.language}]
                      </span>
                    </div>
                    <p className="font-bold text-2xl w-80">
                      {movie.genres.join("/ ")}
                    </p>
                    <ul className="mt-5">
                      <div className="flex gap-4">
                        <p className="flex flex-col justify-center">
                          Available In:
                        </p>
                        {movie.torrents.map((torrent, index) => (
                          <button
                            key={index}
                            className="border p-1 hover:text-gray-400 hover:transition duration-700 bg-black m-1"
                          >
                            {torrent.quality}
                          </button>
                        ))}
                      </div>
                    </ul>
                    <p className="text-xs text-gray-400 font-bold">
                      WEB: same quality as BluRay
                    </p>
                    <button className="border border-gray-600 p-1 mt-7 flex justify-center items-center gap-2">
                      <span className="text-2xl text-green-600">
                        {" "}
                        <AiOutlineDownload />{" "}
                      </span>{" "}
                      Download Subtitles
                    </button>
                    <div className="flex gap-9 mt-6">
                      <p className="flex items-center text-ytsthemecolor">
                        <FaHeart />
                      </p>
                      <span className="font-bold text-xl m-1">
                        {movie.like_count}
                      </span>
                    </div>
                    <div className="flex gap-7">
                    <p className="flex items-center size-7 p-1">
                       <img src="/rt-rotten.svg" alt="" className=""/> </p>
                       <p className="flex"><b> 58% </b> TOMATOMETER</p>
                       </div>
                       <div className="flex gap-7">
                       <p className="flex items-center  justify-center size-7 p-1">
                       <img src="/rt-upright.svg" alt="" className=""/> </p>
                       <p><b> 84% </b> AUDIENCE </p></div>

                    <div className="flex gap-7">
                      <p className="flex items-center size-7 p-1">
                       <img src="/logo-imdb.svg" alt="" className=""/>
                      </p>{" "}
                      <p className="font-bold text-xl">
                        {" "}
                        {movie.rating} <span className="font-thin">/10</span>
                      </p>
                    </div>
                  </div>
                  <div className="suggested-movies p-2">
                    <h2 className=" font-bold mb-4 text-white">
                      Similar Movies
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {suggestions.map((suggestion) => (
                        <a href={`/details/${suggestion.id}`}>
                          <div key={suggestion.id} className="suggested-movie">
                            {/* Render suggested movie information here */}
                            <img
                              src={suggestion.small_cover_image}
                              alt={suggestion.title}
                              className="w-full h-36 border-4 rounded-md hover:border-ytsthemecolor hover:cursor-pointer hover:transition duration-700"
                            />
                            {/* <h3 className="text-lg font-bold">{suggestion.title}</h3>
              <p>{suggestion.year}</p> */}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
            {movie.yt_trailer_code && (
              <>
                  <div className="">
                  <button onClick={() => openMedia("trailer")}>
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                    title="video"
                    className="h-40"
                  ></iframe>
                  </button>
                  </div>
              </>
            )}
            <div className="flex gap-2 justify-center bg-black">
            <button onClick={() => openMedia("image1")}>
              <img src={movie.medium_screenshot_image1} alt="" className="hover:cursor-pointer hover:opacity-85 hover:transition duration-300"/>
              </button>
              <button onClick={() => openMedia("image2")}>
              <img src={movie.medium_screenshot_image2} alt="" className="hover:cursor-pointer hover:opacity-85 hover:transition duration-300"/>
              {/* <img src={movie.medium_screenshot_image3} alt="" /> */}
              </button>
            </div>
            </div>
            {isModalOpen && (
              <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-black bg-opacity-75">
                <div className="relative bg-white rounded-lg w-full max-w-3xl">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
                    onClick={closeMedia}
                  >
                    Close
                  </button>
                  {currentMedia === "trailer" && (
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                        title="video"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  )}
                  {currentMedia === "image1" && (
                    <img
                      src={movie.medium_screenshot_image1}
                      alt=""
                      className="w-full"
                    />
                  )}
                  {currentMedia === "image2" && (
                    <img
                      src={movie.medium_screenshot_image2}
                      alt=""
                      className="w-full"
                    />
                  )}
                </div>
              </div>
            )}
            
                <div className="flex flex-wrap justify-center">
                  <div className="">
                    <h1 className="text-2xl font-bold pt-10 ">Plot Summary</h1>
                    <p className="text-gray-400 w-[800px]">
                      {movie.description_intro.slice(0, 600)}
                    </p>
                  </div>
                  <div className="">
                    <h1 className="p-2 font-bold">Top Cast</h1>
                    <div>
                      {movie.cast.map((castMember, index) => (
                        <div key={index} className="flex">
                          <img
                            src={castMember.url_small_image}
                            alt={castMember.name}
                            className="w-10 h-10 mr-2 rounded-full p-1"
                          />
                          <p className="p-1">{castMember.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

            {
              <div className=" p-1 ">
                <p className="">
                  Uploaded date: {movie.date_uploaded.slice(0, 10)}
                </p>
              </div>
            }
          </div>
        )}

        <Footer />
      </DarkMode>
    </>
  );
};

export default Details;
