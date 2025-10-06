import { ActionType } from "./action";

// Perbarui state awal untuk menampung data statistik
const initialState = {
  list: [],
  stats: {},
  statsDaily: null,
  statsMonthly: null,
};

function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_CASH_FLOWS:
      return { ...state, list: action.payload };
    case ActionType.SET_STATS:
      return { ...state, stats: action.payload };
    // Tambahkan case baru untuk menangani data statistik
    case ActionType.SET_STATS_DAILY:
      return { ...state, statsDaily: action.payload };
    case ActionType.SET_STATS_MONTHLY:
      return { ...state, statsMonthly: action.payload };
    default:
      return state;
  }
}

export default transactionsReducer;