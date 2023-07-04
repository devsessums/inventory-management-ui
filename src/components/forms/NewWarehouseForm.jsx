import * as React from 'react';
import {TextField} from "@mui/material";


const NewWarehouseForm = (props) => {

    return (
        <>

            <TextField id={"company-name"} label={"Company Name"} variant={"outlined"}/>
            <TextField id={"capacity"} label={"Capacity"} variant={"outlined"}/>
            <TextField id={"Address"} label={"Address"} variant={"outlined"}/>
            <TextField id={"city"} label={"City"} variant={"outlined"}/>
            <TextField id={"state"} label={"State"} variant={"outlined"}/>
            <TextField id={"zipcode"} label={"Zipcode"} variant={"outlined"}/>
        </>
    );
}


export default NewWarehouseForm;