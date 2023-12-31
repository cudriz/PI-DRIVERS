import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getDrivers } from "../../redux/actions";
import style from "./Detail.module.css";
import { getByID } from "../../redux/actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const driverId = useSelector(state => state.driverDetail)

  useEffect(()=>{
    dispatch(getByID(id))
  }, [dispatch])


  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.imageContainer}>
        <img className={style.image} src={driverId.image} alt={driverId.name} />
        </div>
        
        <div className={style.details}>
          <p className={style.id}> id: {driverId.id}</p>
          <h2 className={style.name}>Name: {driverId.name}</h2>
          <h2 className={style.surname}>Surname: {driverId.surname}</h2>
          <h2 className={style.description}>
            Description: {driverId.description}
          </h2>
          <h2 className={style.nationality}>
            Nationality: {driverId.nationality}
          </h2>
          <h2 className={style.dob}>Date of Birth: {driverId.dob}</h2>
          <h2 className={style.teams}>Teams: {driverId.teams}</h2>
        </div>
      </div>
    </div>
  );
};

export default Detail;
