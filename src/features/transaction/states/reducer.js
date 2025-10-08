import { ActionType } from "./action";

const initialState = {
  list: [],
  filteredList: [], // <-- TAMBAHKAN STATE BARU
  stats: {},
  statsDaily: null,
  statsMonthly: null,
};

function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_CASH_FLOWS:
      return { ...state, list: action.payload };
    case ActionType.SET_FILTERED_CASH_FLOWS: // <-- TAMBAHKAN CASE BARU
      return { ...state, filteredList: action.payload };
    case ActionType.SET_STATS:
      return { ...state, stats: action.payload };
    case ActionType.SET_STATS_DAILY:
      return { ...state, statsDaily: action.payload };
    case ActionType.SET_STATS_MONTHLY:
      return { ...state, statsMonthly: action.payload };
    default:
      return state;
  }
}

export default transactionsReducer;