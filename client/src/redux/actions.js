import axios from "axios"

export const GET_DRIVERS = "GET_DRIVERS"
export const PAGINATE = "PAGINATE"
export const SEARCH_DRIVER = "SEARCH_DRIVER"
export const ORDER = "ORDER";
export const GET_TEAMS_DRIVERS = "GET_TEAMS_DRIVERS"
export const FILTER_DRIVERS_BY_TEAM = "FILTER_DRIVERS_BY_TEAM";
export const ORDER_BY_BIRTH_YEAR = "ORDER_BY_BIRTH_YEAR"
export const GET_BY_ID = 'GET_BY_ID';
export const POST_DRIVER = "POST_DRIVER"

export const getDrivers = () =>{
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/drivers/")
            const drivers = response.data
            dispatch({
                type: GET_DRIVERS,
                payload: drivers
            })
        } catch (error) {
            console.log("no fue posible obtener los drivers");
        }
    }
}

export const getTeamsDrivers =()=>{
    return async function (dispatch) {
try {
    const response = await axios.get("http://localhost:3001/teams")
    dispatch({
        type: GET_TEAMS_DRIVERS,
        payload: response.data
    })
} catch (error) {
    console.log("teams no encontrados");
}
    }
}

export function getByID(id) {
    return async function (dispatch) {
      try {
        console.log('Solicitando datos del conductor con ID:', id);
        const response = await axios.get(`http://localhost:3001/drivers/${id}`);
        const driverId = response.data;
        console.log(' Datos del conductor recibidos:', driverId);
        dispatch({
          type: GET_BY_ID,
          payload: driverId,
        });
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  }


export const paginatedrivers = (order) =>{
    return async function (dispatch) {
        try {
            dispatch({
                type: PAGINATE,
                payload: order
            })
        } catch (error) {
            console.log();
        }
    }
}

export const seacrhDriver = (name) =>{
    return async function (dispatch) {
        try {
            dispatch({
                type: SEARCH_DRIVER,
                payload: name
            })
        } catch (error) {
            console.log();
        }
    }
}

export const orderDriversAction = (order) => {
    return async function (dispatch) {
      try {
        dispatch({
          type: ORDER,
          payload: order,
        });
      } catch (error) {
        console.error("Ocurrió un error:", error);
      }
    };
  };

  export const filterDriversByTeam = (teams) => {
    return {
      type: FILTER_DRIVERS_BY_TEAM,
      payload: teams,
    };
  };


  export const orderByBirthYear = (order) => {
    return {
      type: ORDER_BY_BIRTH_YEAR,
      payload: order,
    };
  };

  export const getUniqueBirthYears = (drivers) => {
    const birthYears = drivers.map((driver) => driver.dob.split('-')[0]);
    return [...new Set(birthYears)];
  };


  export const postDriver = (state) => {
    return async function (dispatch) {
      try {
        const response = await axios.post(
          "http://localhost:3001/drivers/",
          state
        );
        dispatch({
          type: POST_DRIVER,
          payload: response.data,
        });
        return response.data
      } catch (error) {
        console.log(error);
      }  
    }
  };