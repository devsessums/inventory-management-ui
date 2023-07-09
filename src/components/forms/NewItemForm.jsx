import * as React from 'react';
import {useEffect, useState} from "react";
import {Box, Button, FormGroup, Modal, Paper, Slide, TextField, Typography} from "@mui/material";
import axios from "axios";
import {getUrl} from "../../tools/utils";

const NewItemForm = (props) => {

    const newItem = {
        name: null,
        sku: null,
        description: null,
        price: null,
        amount: null
    }

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

    const handleSubmit = async (e) => {
        console.log("posting");

        e.preventDefault();
        const response = await axios.post(getUrl(`/warehouses/warehouse/${props.warehouseId}/item`), {newItem})
            .then(res => props.handleClose())
            .catch(err => console.log(err));
        console.log(response)
    };

    const handleChange = (e) => {
        switch (e.target.id) {
            case "name":
                newItem.name = e.target.value
                break;

            case "sku":
                newItem.sku = e.target.value
                break;

            case "description":
                newItem.description = e.target.value
                break;

            case "price":
                newItem.price = e.target.value
                break;

            case "amount":
                newItem.amount = e.target.value
                break;
        }
        console.log(newItem);
    }

    return (<>
        <Modal
            open={props.open}
            aria-labelledBy="item-add-modal"
        >
            <Paper sx={style}>
                <div className={"row text-center m-3"}>
                    <Typography variant={"h5"}>New Item</Typography>
                </div>

                <FormGroup onChange={handleChange}>
                    <div className={"row"}>
                        <div className={"col-6-lg"}>
                            <TextField id={"name"} label={"Name"} variant={"filled"} size={"small"}/>
                        </div>
                        <div className={"col-6-lg"}>
                            <TextField id={"sku"} label={"SKU"} variant={"filled"}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-6-lg"}>
                            <TextField id={"description"} label={"Description"} variant={"filled"}/>
                        </div>

                    </div>
                    <div className={"row"}>
                        <div className={"col-6-lg"}>
                            <TextField id={"price"} label={"Price"} variant={"filled"}/>
                        </div>
                        <div className={"col-6-lg"}>
                            <TextField id={"amount"} label={"Amount"} variant={"filled"}/>
                        </div>
                    </div>

                </FormGroup>

                <div className={"row text-center mt-3"}>
                    <div class={"col-lg-6"}>
                        <Button variant={"contained"} onClick={handleSubmit}>Add Item</Button>
                    </div>
                    <div className={"col-lg-6"}>
                        <Button color={"error"} variant={"contained"} onClick={props.handleClose}>Cancel</Button>
                    </div>
                </div>

            </Paper>

        </Modal>
    </>);
};

export default NewItemForm;