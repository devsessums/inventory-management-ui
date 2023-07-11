import * as React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import ItemsTable from "../components/tables/ItemsTable";
import {Alert, Button, Divider, IconButton, Paper, Snackbar, Tooltip, Typography} from "@mui/material";
import {useState} from "react";
import NewItemForm from "../components/forms/NewItemForm";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditWarehouseForm from "../components/forms/EditWarehouseForm";
import {getUrl} from "../tools/utils";

const WarehousePage = () => {

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const [snack, setSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);
    const [severity, setSeverity] = useState("success")

    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSnackOpen = () => setSnack(true);
    const handleSnackClose = () => setSnack(false)
    const location = useLocation();
    const navigate = useNavigate();
    let warehouse = null;
    let newItem = null;

    if (location.state && location.state.warehouse) {
        warehouse = location.state.warehouse;
        console.log(warehouse);
    }

    const handleSnackMessage = (message) => {
        if(message.status !== 201) {
            setSeverity("error");
        } else {
            setSeverity("success");
        }

        setSnackMessage(message.response.data);
    };



    return (<div>
        <Snackbar message={snackMessage} open={snack} autoHideDuration={5000} onClose={handleSnackClose}>

            <Alert severity={severity} onClose={handleSnackClose}>
                {snackMessage}
            </Alert>
        </Snackbar>
        <div className={"container-lg mt-4"}>
            <Paper elevation={5}>
                <div className={"row"}>
                    <div className={"col-sm-4 col-lg-4 text-center"}>
                        <img src={"warehouse1.jpg"} width={"200px"} height={"200px"}/>
                    </div>
                    <div className={"col-sm-8 col-lg-8 text-center"}>
                        <div className={"row"}>
                            <div className={"row"}>
                                <div className={"col-sm-12 text-center p-3"}> {warehouse.companyName} </div>
                                <div>
                                    <IconButton onClick={setEditOpen}><EditIcon>Edit</EditIcon></IconButton>
                                    <EditWarehouseForm open={editOpen}
                                                       handleClose={handleEditClose}
                                                       handleSnackMessage={handleSnackMessage}
                                                       handleSnackOpen={handleSnackOpen}
                                                       payload={warehouse}
                                    />
                                </div>
                            </div>

                            <div className={"row"}>
                                <div className={"col-sm-12 text-center p-3"}> {warehouse.address} </div>
                                <div className={"col-sm-4 text-center"}>{warehouse.city}</div>
                                <div className={"col-sm-4 text-center"}>{warehouse.state}</div>
                                <div className={"col-sm-4 text-center"}>{warehouse.zipcode}</div>
                            </div>

                            <div className={"row p-3"}>

                            </div>

                        </div>
                    </div>
                </div>
            </Paper>
        </div>

        <div className={"container-lg mt-4"}>
            <Paper elevation={24}>

                <div className={"container-lg p-5"}>
                    <div className={"row justify-content-between"}>
                        <div className={"col-4"}>
                            <Typography variant={"h4"}>List of Products</Typography>
                        </div>
                        <div className={"col-4"}>
                            <Typography>{warehouse.size}/{warehouse.capacity}</Typography>
                        </div>
                        <div className={"col-4 text-end"}>
                            <Tooltip title={"Add new item to warehouse"} arrow>
                                <Button variant={"contained"} onClick={handleOpen}>Add New Product</Button>
                            </Tooltip>
                            <NewItemForm warehouseId={warehouse.id} open={open} handleClose={handleClose} handleOpen={handleOpen}/>
                        </div>
                        <Divider className={"mt-2"} sx={{backgroundColor:"black"}} light={false}/>
                    </div>
                </div>


                <ItemsTable warehouse={warehouse}/>
            </Paper>
        </div>

    </div>)
};


export default WarehousePage;