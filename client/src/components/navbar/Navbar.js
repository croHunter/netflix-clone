import "./navbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Notifications, Search, ArrowDropDown } from "@material-ui/icons";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="wrapper">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
          />
          <Link to="/" className="link">
            <span>Home</span>
          </Link>
          <Link to="/?type=Series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/?type=Movie" className="link">
            <span>Movies</span>
          </Link>
          <Link to="/new-&-popular" className="link">
            <span>New & Popular</span>
          </Link>
          <Link to="/list" className="link">
            <span>My-List</span>
          </Link>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            alt="Person"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="option">
              <span>Setting</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
