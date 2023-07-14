import {configureStore} from "@reduxjs/toolkit";
import {set} from './slices/warehouseSlice';

const store = configureStore({
    reducer: {
        warehouse: set
    }
})

export default store;