import { ActionType } from "./action";

// State awal untuk transactions, kita buat jadi object
const initialState = {
  list: [],
  stats: {},
};

function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_CASH_FLOWS:
      return { ...state, list: action.payload };
    case ActionType.SET_STATS:
      return { ...state, stats: action.payload };
    default:
      return state;
  }
}

export default transactionsReducer;