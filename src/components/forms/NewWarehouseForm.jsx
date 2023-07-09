import * as React from 'react';
import {Button, Modal, Paper, TextField} from "@mui/material";
import {useState} from "react";
import usePostWarehousesData from "../../hooks/usePostWarehouseData";
import {getUrl} from "../../tools/utils";
import axios from "axios";


const NewWarehouseForm = (props) => {

    const payload = {
        companyName: null, capacity: null, address: null, city: null, state: null, zipcode: null
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const handleChange = (e) => {
        switch (e.target.id) {
            case "name":
                payload.companyName = e.target.value;
                break;

            case "capacity":
                console.log("adding capacity")
                if (parseInt(e.target.value) > 0) {
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
            .catch(err => {
                props.handleSnackMessage(err);
                props.handleSnackOpen(true);
            });
    };

    return (<Modal
        open={props.open}
        aria-labelledBy="item-add-modal"

    >
        <Paper sx={style}>
            <div className={"container text-center"} onChange={handleChange}>
                <div className={"row mb-3"}>
                    <TextField id={"name"} label={"Company Name"} variant={"outlined"}/>
                </div>
                <div className={"row mb-3"}>
                    <TextField id={"capacity"} label={"Capacity"} variant={"outlined"}/>
                </div>
                <div className={"row mb-3"}>
                    <TextField id={"address"} label={"Address"} variant={"outlined"}/>
                </div>
                <div className={"row mb-3"}>
                    <TextField id={"city"} label={"City"} variant={"outlined"}/>
                </div>
                <div className={"row mb-3"}>
                    <TextField id={"state"} label={"State"} variant={"outlined"}/>
                </div>
                <div className={"row mb-3"}>
                    <TextField id={"zipcode"} label={"Zipcode"} variant={"outlined"}/>
                </div>
                <div className={"row mt-3"}>
                    <div className={"col-lg-6"}>
                        <Button type={"submit"} onClick={handleSubmit} variant={"contained"}>Add</Button>
                    </div>

                    <div className={"col-lg-6"}>
                        <Button color={"error"} variant={"contained"} onClick={props.handleClose}>Cancel</Button>
                    </div>

                </div>

            </div>
        </Paper>
    </Modal>);
}


export default NewWarehouseForm;