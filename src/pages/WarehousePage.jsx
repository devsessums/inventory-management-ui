import * as React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import ItemsTable from "../components/tables/ItemsTable";
import {Alert, Button, Divider, IconButton, keyframes, Paper, Snackbar, Tooltip, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import NewItemForm from "../components/forms/NewItemForm";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditWarehouseForm from "../components/forms/EditWarehouseForm";
import {getUrl} from "../tools/utils";

const WarehousePage = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [snack, setSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);
    const [severity, setSeverity] = useState("success")

    const [updated, setUpdated] = useState(false);

    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSnackOpen = () => setSnack(true);
    const handleSnackClose = () => setSnack(false)


    const {state} = useLocation();
    const [warehouse, setWarehouse] = useState(state.warehouse)
    const [items, setItems] = useState(warehouse.items);

    const handleAdd = (item) => {
        setItems([...items, item]);
    }

    const handleUpdate = (w) => {
        navigate(`/warehouse`, {state: {warehouse: w}});
        setWarehouse(w);
    }

    // sets the snack message severity property
    const handleSnackMessage = (message) => {
        if(message?.status >= 400 && message?.status < 600) {
            setSeverity("error");
        } else {
            setSeverity("success");
        }

        // set the snack message and just in case of bad response to use a default value
        setSnackMessage(message?.response?.data ?? "Something has happened");
    };


    return (<div>
        <Snackbar message={snackMessage} open={snack} autoHideDuration={3000} onClose={handleSnackClose}>

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
                                    <Tooltip title={"Click to edit warehouse"} arrow>
                                        <IconButton onClick={handleEditOpen}><EditIcon>Edit</EditIcon></IconButton>
                                    </Tooltip>
                                    <EditWarehouseForm open={editOpen}
                                                       handleClose={handleEditClose}
                                                       handleSnackMessage={handleSnackMessage}
                                                       handleSnackOpen={handleSnackOpen}
                                                       handleUpdate={handleUpdate}
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
                            <NewItemForm warehouse={warehouse}
                                         open={open}
                                         handleClose={handleClose}
                                         handleOpen={handleOpen}
                                         push={handleAdd}
                            />
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