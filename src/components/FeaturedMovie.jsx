/* eslint-disable no-unreachable */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React from "react";
import "./FeaturedMovie.css";

export default ({ item }) => {
  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--Name">{item.original_name}</div>
          <div className="featured--info">
            <div className="featured--points"></div>
          </div>
        </div>
      </div>
    </section>
  );
  console.log(item);
};
