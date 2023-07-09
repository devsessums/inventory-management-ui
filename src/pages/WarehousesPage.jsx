import * as React from 'react';
import {Alert, Button, CircularProgress, Divider, Grid, Paper, Snackbar, Typography} from "@mui/material";
import useWarehousesData from "../hooks/useWarehousesData";
import {getUrl} from "../tools/utils";
import WarehousesTable from "../components/tables/WarehousesTable";
import NewWarehouseForm from "../components/forms/NewWarehouseForm";
import {useState} from "react";


const WarehousesPage = () => {

    const {data, error, loaded} = useWarehousesData(getUrl("/warehouses"));

    const [open, setOpen] = useState(false);
    const [snack, setSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState(null);
    const [severity, setSeverity] = useState("success")


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSnackOpen = () => setSnack(true);
    const handleSnackClose = () => setSnack(false)

    const handleSnackMessage = (message) => {
        if(message.status !== 201) {
            setSeverity("error");
        } else {
            setSeverity("success");
        }

        setSnackMessage(message.response.data);
    };



    return (

        <div className={"mt-5"}>
            <Snackbar message={snackMessage} open={snack} autoHideDuration={5000} onClose={handleSnackClose}>

                <Alert severity={severity} onClose={handleSnackClose}>
                    {snackMessage}
                </Alert>
            </Snackbar>
            <div className={"container-lg mt-4"}>
                {/*<Paper elevation={5}>*/}
                <div className={"row justify-content-between"}>
                    <div className={"col-6"}>
                        <Typography variant={"h3"}>
                            Managed Warehouses
                        </Typography>
                    </div>
                    <div className={"col-6 text-end mt-2"}>
                        <Button variant={"contained"} onClick={handleOpen}>
                            <Typography>
                                Add New Warehouse
                            </Typography>

                        </Button>
                        <NewWarehouseForm open={open} handleClose={handleClose} handleSnackMessage={handleSnackMessage} handleSnackOpen={handleSnackOpen}/>

                    </div>

                </div>
                {/*</Paper>*/}
            </div>
            <Divider sx={{backgroundColor: "black"}}/>
            <Grid container>
                {/*<Grid item xs={5}>
                    <NewWarehouseForm/>
                </Grid>*/}
                <Grid item xs={12}>
                    {loaded ? <div className={"text-center"}>
                        <Paper className={"mt-5"}>
                            <WarehousesTable warehouses={data}/>
                        </Paper>
                    </div> : <div className={"text-center mt-5"}>
                        <CircularProgress/>
                    </div>}
                </Grid>

            </Grid>
        </div>);
}

export default WarehousesPage;