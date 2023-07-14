import {createSlice} from "@reduxjs/toolkit";

const warehouseSlice = createSlice(
    {
        name: 'warehouse',
        initialState: {
            id: 0,
            companyName: 'default warehouse',
            capacity: 0,
            size: 0,
            address: '1234 Fake Street',
            city: 'city',
            state: 'state',
            zipcode: '32603',
            items: []
        },
        reducers: {
            set: (state, action) => {
                state = action.payload;
            }
        }
    }
)

export default warehouseSlice.reducer;
export const {set} = warehouseSlice.actions;