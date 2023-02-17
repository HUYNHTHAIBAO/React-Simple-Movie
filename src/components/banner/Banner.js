import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
// import { Swiper } from "swiper/types";
import "swiper/scss";
import useSWR from "swr";
import { fetcher } from "../../config";
// Api Banner : https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>
const Banner = () => {

  const [banner, setBanner] = useState([]);
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=647c2db1d376cfd9a87f5a11d1108e6b`,
    fetcher
  );
  useEffect(() => {
    if (data && data.results) setBanner(data.results);
  }, [data]);
  return (
    <Fragment>
      <section className="banner h-[500px] container overflow-hidden">
        <Swiper grabCursor={"true"} slidesPerView={"auto"}>
          {banner.length > 0 &&
            banner.map((item, index) => (
              <SwiperSlide key={item.id}>
                <BannerItem item={item}></BannerItem>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </Fragment>
  );
};

function BannerItem({ item }) {
  const navigate = useNavigate();
  const { poster_path, title, id } = item;
  return (
    <div className="w-full h-full relative rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-full object-cover object-top rounded-lg"
      />
      <div className="absolute left-5 bottom-5 text-white">
        <h2 className="text-3xl font-bold mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8 cursor-pointer">
          <span className="py-2 px-4 border border-white rounded-sm">
            Action
          </span>
          <span className="py-2 px-4 border border-white rounded-sm">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-sm">
            Drama
          </span>
        </div>
        <button
          className="font-bold bg-[#FF3D71] rounded-lg sm:text-xl sm:py-2 sm:px-6 text-md py-2 px-4 "
          onClick={() => navigate(`/movie/${id}`)}
        >
          Watch
        </button>
      </div>
    </div>
  );
}

export default Banner;
