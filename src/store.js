import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./features/transaction/states/reducer";
import authUserReducer from "./features/auth/states/reducer"; // <-- 1. Impor reducer ini

const store = configureStore({
  reducer: {
    // Daftarkan reducer yang sudah kita buat
    transactions: transactionsReducer,
    authUser: authUserReducer, // <-- 2. Daftarkan di sini
  },
});

export default store;