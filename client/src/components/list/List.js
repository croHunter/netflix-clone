import { useRef, useState } from "react";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import ListItem from "../list-item/ListItem";
import "./list.scss";

const List = ({ list }) => {
  const [slideNum, setSlideNum] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const ref = useRef();
  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = ref.current.getBoundingClientRect().x - 50; //.x=50 which is margin of container so distance=0
    // console.log(distance);
    if (direction === "left" && slideNum > 0) {
      ref.current.style.transform = `translateX(${distance + 230}px)`;
      setSlideNum(slideNum - 1);
      slideNum === 1 && setIsMoved(false);
    }
    if (direction === "right" && slideNum < 5) {
      ref.current.style.transform = `translateX(${distance - 230}px)`;
      setSlideNum(1 + slideNum);
    }
  };
  return (
    <div className="list">
      <h1 className="list-title">{list.title}</h1>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="slider-arrow left"
          style={{ display: !isMoved && "none" }}
          onClick={() => handleClick("left")}
        />
        <div className="container" ref={ref}>
          {list.content.map((item, index) => {
            return <ListItem key={index} index={index} item={item} />;
          })}
        </div>
        <ArrowForwardIosOutlined
          className="slider-arrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
