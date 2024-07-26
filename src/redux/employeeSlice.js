import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employees: []
    },
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
        },
        setEmployeeList: (state, action) => {
            state.employees = action.payload;
        }
    }
})

export const { addEmployee, setEmployeeList } = employeeSlice.actions

export default employeeSlice.reducer