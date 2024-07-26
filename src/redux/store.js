import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './employeeSlice'
import vendorReducer from './vendorSlice'
import additionalStates from './additionalStates'

export default configureStore({
  reducer: {
    employee: employeeReducer,
    vendor: vendorReducer,
    additionalStates: additionalStates
  },
})