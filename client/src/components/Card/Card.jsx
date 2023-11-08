import { Link } from "react-router-dom";
import style from "./Card.module.css";
const defaultImageUrl =
  "https://s40320.pcdn.co/wp-content/uploads/2023/04/Max-Verstappen2.jpg";

const Card = ({ id, name, image, teams }) => {
  const teamsArray = typeof teams === "string" ? teams.split(", ") : [];

  const imageUrl = image || defaultImageUrl;
  return (
    <div className={style.card}>
      <img className={style.img} src={imageUrl} alt={name} />
      <Link to={`/detail/${id}`}>
        <p className={style.name}>name: {name}</p>
      </Link>
      <p className={style.teams}>teams: {teamsArray.join(", ")}</p>
    </div>
  );
};

export default Card;
