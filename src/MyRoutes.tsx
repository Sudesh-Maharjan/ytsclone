// import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Project from "./pages/Project";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Details from "./pages/Details";

const MyRoutes = () => {
  return (
 
   <BrowserRouter>
     <Routes>

     <Route path="/"  element={<Home />} />
     <Route path="/browseMovies"  element={<Browse />} />
     <Route path="/details/:id"  element={<Details />} />

     </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes
