import * as React from 'react';
import {CircularProgress, Grid} from "@mui/material";
import useWarehousesData from "../hooks/useWarehousesData";
import {getUrl} from "../tools/utils";
import WarehousesTable from "../components/tables/WarehousesTable";
import NewWarehouseForm from "../components/forms/NewWarehouseForm";


const WarehousesPage = () => {

    const {data, error, loaded} = useWarehousesData(getUrl("/warehouses"));

    return (
        <div className={"mt-5"}>
            <Grid container>
                <Grid item xs={5}>
                    <NewWarehouseForm/>
                </Grid>
                <Grid item xs={7}>
                    {
                        loaded ?<div className={"text-center"}>

                                    <WarehousesTable warehouses={data}/>
                                </div>
                                :
                            <div className={"text-center"}>
                                <CircularProgress/>
                            </div>
                    }
                </Grid>

            </Grid>
        </div>
    );
}

export default WarehousesPage;