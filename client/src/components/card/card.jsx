import style from "../card/card.module.css";
import { Link } from "react-router-dom";

// Resto de tu código...

function Card({ country }) {
  const { id, name, continent, flagImage, capital, area, population } = country;
  return (
    <Link to={`id/${id}`}>
      <div className={style.div}>
        <img className={style.flagImage} src={flagImage} alt="" />
        <div className={style.textContainer}>
          <h2 className={style.h2}>{name}</h2>
          <h3 className={style.h3}>{continent}</h3>
        </div>
      </div>
    </Link>
  );
}

export default Card;
