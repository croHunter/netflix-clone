import { useEffect, useState } from "react";
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  PlayArrow,
  Add,
} from "@material-ui/icons";
import "./listItem.scss";
import axios from "axios";
import { Link } from "react-router-dom";
const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState(null);

  const getMovie = async (item) => {
    try {
      const res = await axios.get(`/movies/find/${item}`, {
        headers: {
          token:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTM2ODdiNjhiYjU2YWRhZWFjOTkxNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyODkxMjAwMiwiZXhwIjoxNjI5MzQ0MDAyfQ.Jv00Jn-JyDAWvdmoHaldvk2brxr64qwOzDQlSu12mcg",
        },
      });
      setMovie(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getMovie(item);
  }, [item]);
  if (!movie) return <div>Loading...</div>;
  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="item"
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      >
        <img src={movie.img} alt="thumbnail" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay loop></video>
            <div className="item-info">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownAltOutlined className="icon" />
              </div>
              <div className="item-info-top">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <p className="desc">{movie.desc}</p>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
