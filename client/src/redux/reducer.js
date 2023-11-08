import {
  GET_DRIVERS,
  PAGINATE,
  SEARCH_DRIVER,
  ORDER,
  GET_TEAMS_DRIVERS,
  FILTER_DRIVERS_BY_TEAM,
  ORDER_BY_BIRTH_YEAR,
  GET_BY_ID
} from "./actions";

const initialState = {
  drivers: [],
  driversBackup: [],
  currentPage: 0,
  allTeams: [],
  driversFilter: [],
  filter: true,
  selectedTeam: "",
  driverId: []
};

const rootReducer = (state = initialState, action) => {
  const ITEMS_PER_PAGE = 12;

  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        drivers: [...action.payload].slice(0, ITEMS_PER_PAGE),
        driversBackup: action.payload,
      };
    case GET_TEAMS_DRIVERS:
      return {
        ...state,
        allTeams: action.payload,
      };
      case GET_BY_ID:
        return {
          ...state,
          driverId: action.payload,
        }

    case PAGINATE:
      const next_page = state.currentPage + 1;
      const prev_page = state.currentPage - 1;

      if (
        action.payload === "next" &&
        next_page * ITEMS_PER_PAGE < state.driversBackup.length
      ) {
        const firstIndex = next_page * ITEMS_PER_PAGE;
        return {
          ...state,
          drivers: state.driversBackup.slice(
            firstIndex,
            firstIndex + ITEMS_PER_PAGE
          ),
          currentPage: next_page,
        };
      } else if (action.payload === "prev" && prev_page >= 0) {
        const firstIndex = prev_page * ITEMS_PER_PAGE;
        return {
          ...state,
          drivers: state.driversBackup.slice(
            firstIndex,
            firstIndex + ITEMS_PER_PAGE
          ),
          currentPage: prev_page,
        };
      }
    case SEARCH_DRIVER:
      const search = action.payload.toLowerCase();
      const filteredDrivers = state.driversBackup.filter((driver) =>
        driver.name.toLowerCase().includes(search)
      );

      return {
        ...state,
        drivers: filteredDrivers.slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
      };
    case ORDER:
      let orderByName = [];
      if (action.payload === "AZ") {
        orderByName = [...state.driversBackup].sort((prev, next) => {
          return prev.name.toLowerCase().localeCompare(next.name.toLowerCase());
        });
      } else {
        orderByName = [...state.driversBackup].sort((prev, next) => {
          return next.name.toLowerCase().localeCompare(prev.name.toLowerCase());
        });
      }
      return {
        ...state,
        drivers: orderByName.slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
      };

    case FILTER_DRIVERS_BY_TEAM:
      const selectedTeam = action.payload;
      const filteredDriversByTeam = state.driversBackup.filter(
        (driver) => driver.teams === selectedTeam
      );
      return {
        ...state,
        drivers: filteredDriversByTeam.slice(0, ITEMS_PER_PAGE),
        currentPage: 0,
        selectedTeam,
      };
      case ORDER_BY_BIRTH_YEAR:
        const selectedYear = action.payload;
        const filteredDriversByYear = state.driversBackup.filter(
          (driver) => driver.dob.split("-")[0] === selectedYear
        );
      
        return {
          ...state,
          drivers: filteredDriversByYear.slice(0, ITEMS_PER_PAGE),
          currentPage: 0,
        };
      

    default:
      return { ...state };
  }
};

export default rootReducer;
