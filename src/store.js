import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./features/transaction/states/reducer";

const store = configureStore({
  reducer: {
    // Daftarkan reducer yang sudah kita buat
    transactions: transactionsReducer,
  },
});

export default store;