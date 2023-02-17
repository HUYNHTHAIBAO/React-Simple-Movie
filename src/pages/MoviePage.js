import React, { Fragment, useEffect, useState } from "react";
import { fetcher } from "../config";
import useSWR from "swr";
import lodash from "lodash";
import MovieCard from "../components/movie/MovieCard";
import ReactPaginate from "react-paginate";
// api tìm kiếm phim :
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
const MoviePage = () => {
  // Phân trang
  const [nextPage, setNextPage] = useState(1);
  // search
  const [filter, setFilter] = React.useState("");
  const [url, setUrl] = React.useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=647c2db1d376cfd9a87f5a11d1108e6b&page=${nextPage}`
  );
  const handleFilterChange = lodash.debounce((e) => {
    setFilter(e.target.value);
    console.log(e.target.value);
  }, 1000);
  useEffect(() => {
    if (filter) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=647c2db1d376cfd9a87f5a11d1108e6b&query=${filter}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=647c2db1d376cfd9a87f5a11d1108e6b&page=${nextPage}`
      );
    }
  }, [filter]);
  const [moviePage, setMoviePage] = React.useState([]);
  const { data, error, isLoading } = useSWR(url, fetcher);
  useEffect(() => {
    if (data && data.results) setMoviePage(data.results);
  }, [data]);
  const loading = !data && !error;
  const setError = !filter && !data;

  // Phân trang

  //

  return (
    <Fragment>
      <div className="flex container mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-3 outline-none rounded-l-lg"
            placeholder="Enter your search movie ..."
            defaultValue=""
            onChange={handleFilterChange}
          />
        </div>
        <button className="bg-[#FF3D71] p-3 rounded-r-lg text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin border-[#FF3D71] mx-auto m-10"></div>
      )}
      {setError && <div>lỗi</div>}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  text-white gap-10 cursor-pointer container">
        {moviePage.length > 0 &&
          moviePage.map((item, index) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      {/* Phân trang */}
    </Fragment>
  );
};

export default MoviePage;
