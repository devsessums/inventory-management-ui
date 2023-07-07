import * as React from 'react';
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import usePostWarehousesData from "../../hooks/usePostWarehouseData";
import {getUrl} from "../../tools/utils";
import axios from "axios";


const NewWarehouseForm = (props) => {

    const payload = {
        companyName:null,
        capacity: null,
        address: null,
        city: null,
        state: null,
        zipcode: null
    };

    const handleChange = (e) => {
        switch (e.target.id) {
            case "name":
                payload.companyName = e.target.value;
                break;

            case "capacity":
                console.log("adding capacity")
                if(parseInt(e.target.value) > 0) {
                    console.log("successful parse")
                    payload.capacity = parseInt(e.target.value);
                } else {
                    console.log("bad parse")
                }
                break;

            case "address":
                payload.address = e.target.value;
                break;

            case "city":
                payload.city = e.target.value;
                break;

            case "state":
                payload.state = e.target.value;
                break;

            case "zipcode":
                payload.zipcode = e.target.value;
                break;

        }
    }

    const handleSubmit = (e) => {
        console.log("posting");

        e.preventDefault();
        axios.post(getUrl("/warehouses/warehouse"), payload)
        .then(r => console.log(r))
            .catch(err => console.log(err));
    };

    return (
        <div className={"container text-center"} onChange={handleChange}>
            <TextField id={"name"} label={"Company Name"} variant={"outlined"}/>
            <TextField id={"capacity"} label={"Capacity"} variant={"outlined"}/>
            <TextField id={"address"} label={"Address"} variant={"outlined"}/>
            <TextField id={"city"} label={"City"} variant={"outlined"}/>
            <TextField id={"state"} label={"State"} variant={"outlined"}/>
            <TextField id={"zipcode"} label={"Zipcode"} variant={"outlined"}/>
            <div className={"row text-center"}>
                <div>
                    <Button type={"submit"} onClick={handleSubmit} variant={"contained"}>Add</Button>
                </div>

            </div>

        </div>
    );
}


export default NewWarehouseForm;