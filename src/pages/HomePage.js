import React, { Fragment } from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movie-layout container text-white mt-10">
        <h2 className="text-2xl font-bold capitalize">Now playing </h2>
        <MovieList></MovieList>
      </section>
      <section className="movie-layout container text-white mt-10">
        <h2 className="text-2xl font-bold capitalize">Top Trending </h2>
        <MovieList type="popular"></MovieList>
      </section>
      <section className="movie-layout container text-white mt-10">
        <h2 className="text-2xl font-bold capitalize">Top Rated </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
