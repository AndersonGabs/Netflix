/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./tmdb";
import MovieRow from "./components/MovieRow.jsx";
import FeaturedMovie from "./components/FeaturedMovie.jsx";
import tmdb from "./tmdb";
import Header from "./components/Header.jsx";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      //PEGANDO O FEATURED
      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {FeaturedData && <FeaturedMovie item={FeaturedData} />}
      <section className="lists">
        {movieList.map((item, Key) => (
          <MovieRow key={Key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer
        style={{
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: " #E50914",
          height: "100px",
          alignContent: "center",
        }}
      >
        Aplicação desenvolvida para fins de estudo e aprendizado por Anderson
        Gabriel.
        <span role="img" aria-label="foguete">
          🚀
        </span>
        <br />
        Direitos de Imagem para Netflix
        <br />
        Dados pegos do site TheMoviedb.org
      </footer>
      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="carregando"
          />
        </div>
      )}
    </div>
  );
};
