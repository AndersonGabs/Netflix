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

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
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

  return (
    <div className="page">
      {FeaturedData && <FeaturedMovie item={FeaturedData} />}
      <section className="lists">
        {movieList.map((item, Key) => (
          <MovieRow key={Key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};
