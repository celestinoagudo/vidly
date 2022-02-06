import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
// import logger from "./middleware/logger";
// import api from "./middleware/api";

export default function createStore() {
  return configureStore({
    reducer,
  });
}
