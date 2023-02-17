import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetcher } from "../config";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";
const MovieDetailPage = () => {
  // Api lấy chi tiết phim : https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
  // Lấy id Movie
  const { movieId } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=647c2db1d376cfd9a87f5a11d1108e6b`,
    fetcher
  );
  if (!data) return null;
  const { poster_path, backdrop_path, overview, title, genres } = data;
  console.log(data);
  return (
    <div className="text-white p-5">
      <div className="w-full h-full relative ">
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
        <div
          className="w-full hidden sm:block  h-screen bg-cover bg-top bg-no-repeat rounded-lg"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full sm:max-w-[500px] lg:max-w-[800px]  h-[400px] mx-auto rounded-2xl overflow-hidden sm:-mt-[200px] relative z-10 mb-10 mt-5">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="w-full h-full object-cover object-top"
        />
      </div>
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <div className="flex justify-center gap-x-5 mt-5">
        {genres.map((item, index) => (
          <span
            className="border border-[#FF3D71] py-2 px-4 cursor-pointer rounded-lg hover:bg-[#FF3D71]"
            key={item.id}
            item={item.name}
          >
            {item.name}
          </span>
        ))}
      </div>
      <div className="w-full max-w-[800px] mx-auto text-justify p-4 leading-6">
        <p>{overview}</p>
      </div>
      <div className="mt-5 ">
        <h3 className="text-center text-4xl ">Cast</h3>
        <MovieCast></MovieCast>
      </div>
      <div className="">
        <MovieVideos></MovieVideos>
      </div>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};
// Api lấy diễn viên : https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
const MovieCast = () => {
  const { movieId } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=647c2db1d376cfd9a87f5a11d1108e6b`,
    fetcher
  );
  console.log(data);
  if (!data) return null;
  const { cast } = data;
  console.log(cast);
  if (!cast && cast.length > 0) return null;
  // const { profile_path, name } = data;
  return (
    <div className="movie-cast gap-x-5 mt-5">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {cast.map((item, index) => (
          <SwiperSlide>
            <div className="p-4" key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                alt=""
                className="rounded-lg"
              />
              <p className="text-xl font-bold p-2">{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
// Api lấy video trailer : https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
// Lấy key của api
const MovieVideos = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=647c2db1d376cfd9a87f5a11d1108e6b`,
    fetcher
  );
  if (!data) return null;
  console.log(data.results);
  return (
    <div className="mt-10 p-5">
      <h2 className="text-3xl font-bold mb-4">Trailers Movies</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-10 ">
        {data.results.slice(0, 2).map((item, index) => (
          <div className="" key={item.id}>
            <div className="" key={item.id}>
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Đừng Quên Tên Anh - Hoa Vinh | Official Music Video (4k)"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <p className="text-md mt-2">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// Api lấy danh sách phim liên quan :
// https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1
const MovieSimilar = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=647c2db1d376cfd9a87f5a11d1108e6b`,
    fetcher
  );
  console.log(data);
  if (!data) return null;
  const { results } = data;
  if (!results) return null;
  return (
    <div className="">
      <div className="movie-list mt-20">
        <h2 className="text-3xl my-5 font-bold">Similar Movies</h2>
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {data.results.length > 0 &&
            data.results.map((item, index) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetailPage;
