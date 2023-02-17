import { Fragment } from "react";
import Banner from "./components/banner/Banner";
import Header from "./components/layout/Header";
import MovieCard from "./components/movie/MovieCard";
import MovieList from "./components/movie/MovieList";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              // Cùng nằm trong Trang chủ
              <>
                <Banner></Banner>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route path="/movie" element={<MoviePage> </MoviePage>}></Route>
          <Route path="/movie/:movieId" element={<MovieDetailPage> </MovieDetailPage>}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
