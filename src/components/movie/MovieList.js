import React, { Fragment, useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher } from "../../config";
// key api : 647c2db1d376cfd9a87f5a11d1108e6b
// api getMovieNow : https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>
const MovieList = ({ type = "now_playing" }) => {
    console.log(`type :  ${type}`);
  const [movies, setMovies] = useState([]);
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=647c2db1d376cfd9a87f5a11d1108e6b`,
    fetcher
  );
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  return (
    <Fragment>
      <div className="movie-list mt-4">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item, index) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </Fragment>
  );
};

export default MovieList;
