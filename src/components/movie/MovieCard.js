import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
// api image : https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="movie-card p-3 bg-slate-800 rounded-lg h-full flex flex-col ">
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
        <h3 className="text-xl mt-2 text-[#00aefd]">{title}</h3>
        <div className="flex justify-between mt-1 mb-4 text-sm opacity-80">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <button
          onClick={() => navigate(`/movie/${id}`)}
          className="bg-[#FF3D71] font-bold w-full py-3 rounded-lg mt-auto"
        >
          Watch now
        </button>
      </div>
    </Fragment>
  );
};

export default MovieCard;
