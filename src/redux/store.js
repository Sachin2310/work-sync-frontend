import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import vendorReducer from "./vendorSlice";
import additionalStates from "./additionalStates";
import tokenReducer from "./accessTokenSlice";
import loaderReducer from "./loaderSlice";

export default configureStore({
  reducer: {
    employee: employeeReducer,
    vendor: vendorReducer,
    additionalStates: additionalStates,
    tokens: tokenReducer,
    loader: loaderReducer,
  },
});
