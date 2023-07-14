import * as React from 'react';
import {Alert, Button, CircularProgress, Divider, Grid, Paper, Snackbar, Tooltip, Typography} from "@mui/material";
import {getUrl} from "../tools/utils";
import WarehousesTable from "../components/tables/WarehousesTable";
import NewWarehouseForm from "../components/forms/NewWarehouseForm";
import {useEffect, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";


const WarehousesPage = () => {

    const [warehouses, setWarehouses] = useState(null);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const [open, setOpen] = useState(false);
    const [snack, setSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);
    const [severity, setSeverity] = useState("success")

    // bool for new warehouse form
    const [isAddWarehouse, setIsAddWarehouse] = useState(false);

    // warehouse to be added after isAddWarehouse is true
    const [newWarehouse, setNewWarehouse] = useState(null);
    const handleNewWarehouse = (warehouse) => setNewWarehouse(warehouse);

    const [isDeleteWarehouse, setIsDeleteWarehouse] = useState(false);
    const [warehouseIndex, setWarehouseIndex] = useState(null);

    const [isEdited, setIsEdited] = useState(null);


    const handleAddTrue = () => setIsAddWarehouse(true);
    const handleAddFalse = () => setIsAddWarehouse(false);

    const handleDeleteTrue = () => setIsDeleteWarehouse(true);
    const handleDeleteFalse = () => setIsDeleteWarehouse(false);

    const handleEditedTrue = () => setIsEdited(true);
    const handleEditedFalse = () => setIsEdited(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSnackOpen = () => setSnack(true);
    const handleSnackClose = () => setSnack(false)


    const handleSnackMessage = (response) => {
        if (response?.status >= 400 && response?.status < 600) {
            setSeverity("error");
        } else {
            setSeverity("success");
        }
    };



    // initial load of data
    useEffect(() => {
        (async () => {
            await wait(2000);
            fetch(getUrl("/warehouses"), {
                method: 'GET', headers: {
                    "content-type": 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setLoaded(true);
                    setWarehouses(data);
                    handleAddFalse();
                    handleDeleteFalse();
                })
                .catch(err => setError(err))

        })()
    }, []);


    // useEffect for adding/deleting to warehouses

    useEffect(() => {
        if(isAddWarehouse) {
            console.log("adding warehouse");
            setWarehouses([...warehouses, newWarehouse])
            setIsAddWarehouse(false);
        } else if(isDeleteWarehouse) {
            console.log("deleting warehouse");
            warehouses.splice(warehouseIndex, 1);
            setWarehouses(warehouses);
            setIsDeleteWarehouse(false);
        } else if(isEdited) {
            console.log("editing warehouse")
        }

    }, [isAddWarehouse, isDeleteWarehouse, isEdited])


    return (

        <div className={"mt-5"}>
            <Snackbar message={snackMessage} open={snack} autoHideDuration={3000} onClose={handleSnackClose}>

                <Alert severity={severity} onClose={handleSnackClose}>
                    {snackMessage}
                </Alert>
            </Snackbar>
            <div className={"container-lg mt-4"}>
                <div className={"row justify-content-between"}>
                    <div className={"col-6"}>
                        <Typography variant={"h3"}>
                            Managed Warehouses
                        </Typography>
                    </div>
                    <div className={"col-6 text-end mt-2"}>
                        <Tooltip title={"Click to add a warehouse"} arrow>
                            <Button variant={"contained"}
                                    onClick={handleOpen}
                                    sx={{
                                        backgroundColor: '#F78F1F',
                                        color: 'black',
                                        ":hover": {bgcolor: '#F78F2F', color: 'black'}
                                    }}>
                                <Typography>
                                    Add New Warehouse
                                </Typography>
                            </Button>
                        </Tooltip>
                        <NewWarehouseForm open={open}
                                          handleClose={handleClose}
                                          handleSnackMessage={handleSnackMessage}
                                          handleSnackOpen={handleSnackOpen}
                                          added={handleAddTrue}
                                          addWarehouse={handleNewWarehouse}
                        />
                    </div>
                </div>
            </div>
            <Divider sx={{backgroundColor: "black"}}/>
            <Grid container>
                <Grid item xs={12}>
                    {loaded ? <div className={"text-center"}>
                        <Paper className={"mt-5"}>
                            <WarehousesTable
                                warehouses={warehouses}
                                added={isAddWarehouse}
                                handleDeleted={handleDeleteTrue}
                                handleDeleteIndex={setWarehouseIndex}
                                deleted={setIsDeleteWarehouse}
                                handleEditedTrue={handleEditedTrue}

                            />
                        </Paper>
                    </div> : <div className={"text-center mt-5"}>
                        <CircularProgress/>
                    </div>}
                </Grid>

            </Grid>
        </div>);
}

export default WarehousesPage;