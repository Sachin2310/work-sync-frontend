import { createSlice } from '@reduxjs/toolkit'

export const additionalStates = createSlice({
    name: "additionalStates",
    initialState: {
        employeeType: "",
        showUserList: "",
        emails: []
    },
    reducers: {
        setEmployeType: (state, action) => {
            state.employeeType = action.payload;
        },
        setShowUserList: (state, action) => {
            state.showUserList = action.payload;
        },
        setEmailList: (state, action) => {
            state.emails = action.payload;
        },
        addEmail: (state, action) => {
            state.emails.push(action.payload);
        }
    }
})

export const { setEmployeType, setShowUserList, setEmailList, addEmail } = additionalStates.actions

export default additionalStates.reducer