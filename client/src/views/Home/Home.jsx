import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterDriversByTeam,
  getDrivers,
  getTeamsDrivers,
  orderDriversAction,
  paginatedrivers,
  orderByBirthYear,
  getUniqueBirthYears,
  filterOrigin,
} from "../../redux/actions";
import Cards from "../../components/Cards/Cards";
import style from "./Home.module.css"
const Home = () => {
  const dispatch = useDispatch();
  const driversData = useSelector((state) => state.drivers);
  const allTeams = useSelector((state) => state.allTeams);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedBirthYear, setSelectedBirthYear] = useState("");
  const availableBirthYears = getUniqueBirthYears(driversData);

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeamsDrivers());
  }, [dispatch]);

  const paginate = (event) => {
    dispatch(paginatedrivers(event.target.name));
  };

  const orderDrivers = (event) => {
    dispatch(orderDriversAction(event.target.value));
  };

  const handleTeamChange = (event) => {
    const team = event.target.value;
    setSelectedTeam(team);

    dispatch(filterDriversByTeam(team));
  };

  const handleBirthYearChange = (event) => {
    const year = event.target.value;
    setSelectedBirthYear(year);
    dispatch(orderByBirthYear(year));
  };
  const handleFilterOrigin = (event) => {
dispatch(filterOrigin(event.target.value))
  }
    

 

  return (
    <div className={style.container}>
      <div className={style.filtersContainer}>
        <div className={style.filters}>
          <h3>Ordenamiento</h3>
          <select onChange={orderDrivers} name="orden" id="">
            <option value=""></option>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
          </select>
        </div>
        <div className={style.filters}>
          <h3>Filtrar por Equipo</h3>
          <select onChange={handleTeamChange} value={selectedTeam}>
            <option value="">Todos los equipos</option>
            {allTeams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
        <div className={style.filters}>
          <h3>Filtrar por Año de Nacimiento</h3>
          <select onChange={handleBirthYearChange} value={selectedBirthYear}>
            <option value="">Todos los años</option>
            {availableBirthYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div>Origin
        <select onChange={(e) => handleFilterOrigin(e)}>
            {["All", "Api", "Local"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>

           </div>
        <div className={style.pagination}>
          <h4>Paginado</h4>
          <button className={style.page}onClick={paginate} name="prev">
            Prev
          </button>
          <button className={style.page} onClick={paginate} name="next">
            Next
          </button>
        </div>
     
      <Cards cards={driversData} />
    </div>
  );
};

export default Home;
