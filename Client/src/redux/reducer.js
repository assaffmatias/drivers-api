import { GET_DRIVERS, GET_DRIVER_ID, GET_TEAMS, POST_DRIVER, FILTER, ORDER, SELECT_TEAM, HANDLE_ERROR, RESET_DETAIL, DELETE_DRIVER } from "./actions";

const initialState = {
    drivers: [],
    driverDetail: [],
    teams: [],
    filterCreated: null,
    selectedTeam: null,
    error: null,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRIVERS:
            return { ...state, drivers: action.payload }

        case HANDLE_ERROR:
            return {
                ...state,
                drivers: [],
                error: action.payload,
            };

        case GET_DRIVER_ID:
            return { ...state, driverDetail: action.payload }

        case POST_DRIVER:
            return { ...state, drivers: [...state.drivers, action.payload] }

        case GET_TEAMS:
            return { ...state, teams: action.payload }

        case FILTER:
            let filterValue;

            action.payload === "all" ? filterValue = null
                : action.payload === "created" ? filterValue = true
                    : action.payload === "notCreated" ? filterValue = false
                        : undefined

            return { ...state, filterCreated: filterValue }

        case ORDER:

            let orderedDrivers;
            action.payload === "default" ? orderedDrivers = state.drivers.slice().sort((a,b) => {
                if (a.created && !b.created) {
                    return -1;
                  } else if (!a.created && b.created) {
                    return 1;
                  }
                  return a.id - b.id;
            })
                : action.payload === "nameUpward" ? orderedDrivers = state.drivers.slice().sort((a, b) => a.name.localeCompare(b.name))
                    : action.payload === "nameFalling" ? orderedDrivers = state.drivers.slice().sort((a, b) => b.name.localeCompare(a.name))
                        : action.payload === "dobUpward" ? orderedDrivers = state.drivers.slice().sort((a, b) => new Date(a.dob) - new Date(b.dob))
                            : action.payload === "dobFalling" ? orderedDrivers = state.drivers.slice().sort((a, b) => new Date(b.dob) - new Date(a.dob))
                                : undefined

            return { ...state, drivers: orderedDrivers }


        case SELECT_TEAM:
            return { ...state, selectedTeam: action.payload }

        case RESET_DETAIL:
            return { ...state, driverDetail: [] }

        case DELETE_DRIVER:
            return {...state, drivers: state.drivers.filter((driv)=> driv.id !== action.payload)}

        default:
            return { ...state }
    }
}

export default rootReducer;