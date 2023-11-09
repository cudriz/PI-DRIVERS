import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamsDrivers, postDriver } from "../../redux/actions";

const Form = () => {
  const dispatch = useDispatch();
  const allTeams = useSelector((state) => state.allTeams);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(getTeamsDrivers());
  }, [dispatch]);

  const [state, setState] = useState({
    name: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    description: "",
    nationality: "",
    image: "",
    dob: "",
    teams: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (event.target.name === "teams") {
      const selectedTeams = [...state.teams];

      if (selectedTeams.includes(value)) {
        const updatedTeams = selectedTeams.filter((team) => team !== value);
        setState({
          ...state,
          teams: updatedTeams,
        });
      } else {
        selectedTeams.push(value);
        setState({
          ...state,
          teams: selectedTeams,
        });
      }
    } else {
      setState({
        ...state,
        [property]: value,
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    for (let error in errors) {
      if (errors[error] !== "") {
        return;
      }
    }
    dispatch(postDriver(state));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Crea un nuevo conductor</h1>
        <label htmlFor="Name">Name: </label>
        <input
          onChange={handleChange}
          type="text"
          id="name"
          name="name"
          value={state.name}
        />
        <div>
          <p>{errors.name}</p>
        </div>

        <label htmlFor="surname">Surname: </label>
        <input
          onChange={handleChange}
          type="text"
          id="surname"
          name="surname"
          value={state.surname}
        />
        <div>
          <p>{errors.surname}</p>
        </div>
        <label htmlFor="">Image</label>
        <input
          onChange={handleChange}
          type="text"
          value={state.image}
          name="image"
        />

        <label htmlFor="description">Description: </label>
        <textarea
          onChange={handleChange}
          id="description"
          name="description"
          value={state.description}
        />
        <div>
          <p>{errors.description}</p>
        </div>

        <label htmlFor="nationality">Nationality: </label>
        <input
          onChange={handleChange}
          type="text"
          id="nationality"
          name="nationality"
          value={state.nationality}
        />
        <div>
          <p>{errors.nationality}</p>
        </div>

        <label htmlFor="dob">Dob: </label>
        <input
          onChange={handleChange}
          type="date"
          id="dob"
          name="dob"
          value={state.dob}
        />
        <div>
          <p>{errors.dob}</p>
        </div>

        <label htmlFor="teams">Teams: </label>
        <select onChange={handleChange} name="teams" id="">
          {allTeams.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <div>
          {state.teams.map((t) => (
            <span key={t}>{t}/</span>
          ))}
        </div>
        <div>
          <p>{errors.teams}</p>
        </div>

        <input type="submit" />
      </form>
      {/* <div>{successMessage && <p>{successMessage}</p>}</div> */}
    </div>
  );
};

export default Form;
