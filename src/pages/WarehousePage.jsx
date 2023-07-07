import * as React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import ItemsTable from "../components/tables/ItemsTable";
import {Button, Paper, Typography} from "@mui/material";
import {useState} from "react";
import NewItemForm from "../components/forms/NewItemForm";

const WarehousePage = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const location = useLocation();
    const navigate = useNavigate();
    let warehouse = null;

    if (location.state && location.state.warehouse) {
        warehouse = location.state.warehouse;
        console.log(warehouse);
    }



    return (<div>

        <div className={"container-lg mt-4"}>
            <Paper elevation={5}>
                <div className={"row"}>
                    <div className={"col-sm-4 col-lg-4 text-center"}>
                        <img src={"warehouse1.jpg"} width={"200px"} height={"200px"}/>
                    </div>
                    <div className={"col-sm-8 col-lg-8 text-center"}>
                        <div className={"row"}>
                            <div className={"row"}>
                                <div className={"col-sm-12 text-center p-3"}> {warehouse.company_name} </div>
                            </div>

                            <div className={"row"}>
                                <div className={"col-sm-12 text-center p-3"}> {warehouse.address} </div>
                            </div>

                            <div className={"row p-3"}>
                                <div className={"col-sm-4 text-center"}> City Name</div>
                                <div className={"col-sm-4 text-center"}> State</div>
                                <div className={"col-sm-4 text-center"}>Zip Code</div>
                            </div>

                        </div>
                    </div>
                </div>
            </Paper>
        </div>

        <div class={"container-lg mt-4"}>
            <Paper elevation={24}>

                <div className={"container-lg p-5"}>
                    <div className={"row justify-content-between"}>
                        <div className={"col-6"}>
                            <Typography variant={"h4"}>List of Products</Typography>
                        </div>
                        <div className={"col-6 text-end"}>
                            <Button variant={"contained"} onClick={handleOpen}>Add New Product</Button>
                            <NewItemForm warehouseId={warehouse.id} open={open} handleClose={handleClose} handleOpen={handleOpen}/>
                        </div>
                    </div>
                </div>


                <ItemsTable warehouse={warehouse}/>
            </Paper>
        </div>

    </div>)
};


export default WarehousePage;