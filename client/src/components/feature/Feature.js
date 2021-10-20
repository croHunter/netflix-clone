import { useEffect, useState } from "react";
import "./feature.scss";
import { PlayArrow, InfoOutlined } from "@material-ui/icons";
import axios from "axios";
const Feature = ({ type }) => {
  const [randContent, setRandContent] = useState(null);
  const getRandomContent = async (type) => {
    const res = await axios.get(`/movies/random?type=${type}`, {
      headers: {
        token:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTM2ODdiNjhiYjU2YWRhZWFjOTkxNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyODkxMjAwMiwiZXhwIjoxNjI5MzQ0MDAyfQ.Jv00Jn-JyDAWvdmoHaldvk2brxr64qwOzDQlSu12mcg",
      },
    });
    setRandContent(res.data[0]);
  };
  useEffect(() => {
    getRandomContent(type);
  }, [type]);
  if (!randContent) return <div>loading..</div>;
  return (
    <div className="feature">
      {type && (
        <div className="category">
          <span>{type === "Movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="shounen">Shounen</option>
            <option value="action">Action</option>
            <option value="horror">Horror</option>
            <option value="slice 0f life">Slice 0f life</option>
            <option value="senin">Senin</option>
            <option value="comedy">Comedy</option>
            <option value="romance">Romance</option>
            <option value="parody">Parody</option>
            <option value="drama">Drama</option>
          </select>
        </div>
      )}
      <img src={randContent.img} alt="Megalo-Hero" className="hero-img" />
      <div className="hero">
        <img src={randContent.imgTitle} alt="title-img" />

        <p className="info">{randContent.desc}</p>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feature;
