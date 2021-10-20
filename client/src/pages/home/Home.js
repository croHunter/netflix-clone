import { useEffect, useState } from "react";
import Feature from "../../components/feature/Feature";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { getQueryParams } from "../../helper/getQueryParams";
import "./home.scss";
import axios from "axios";
const Home = () => {
  const url = useLocation().search; //"?type=series"
  const [type, setType] = useState(null);
  const [genre, setGenre] = useState(null);
  const [lists, setLists] = useState([]);
  const getRandomLists = async (type, genre) => {
    try {
      const res = await axios.get(
        `/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
        {
          headers: {
            token:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTM2ODdiNjhiYjU2YWRhZWFjOTkxNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyODkwNzIwNiwiZXhwIjoxNjI5MzM5MjA2fQ.jBebcFG1nG3wVhTHq4z3iWsyEXEEakCpKHKHEBDbM_c",
          },
        }
      );
      setLists(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    url ? setType(getQueryParams(url)) : setType(null);
    getRandomLists(type, genre);
  }, [url, type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Feature type={type} />
      {lists.map((list) => {
        return <List key={list._id} list={list} />;
      })}
    </div>
  );
};

export default Home;
