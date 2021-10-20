import { ArrowBackIosOutlined } from "@material-ui/icons";
import "./watch.scss";
import { useLocation, Link } from "react-router-dom";
const Watch = () => {
  const movie = useLocation().movie;
  return (
    <div className="watch">
      <Link to="/" className="link">
        <div className="back">
          <ArrowBackIosOutlined className="icon" />
          <h1>Home</h1>
        </div>
      </Link>

      <video
        className="video"
        src={movie.video}
        autoPlay
        controls
        progress
      ></video>
    </div>
  );
};

export default Watch;
