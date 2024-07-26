import { createSlice } from '@reduxjs/toolkit'

export const vendorSlice = createSlice({
    name: "vendor",
    initialState: {
        vendors: []
    },
    reducers: {
        addVendor: (state, action) => {
            state.vendors.push(action.payload);
        },
        setVendorList: (state, action) => {
            state.vendors = action.payload;
        }
    }
})

export const { addVendor, setVendorList } = vendorSlice.actions

export default vendorSlice.reducer