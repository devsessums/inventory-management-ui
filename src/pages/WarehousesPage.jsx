import * as React from 'react';
import Navbar from "../components/navs/Navbar";
import {useEffect, useMemo, useState} from "react";
import {CircularProgress, Grid} from "@mui/material";
import useWarehousesData from "../hooks/useWarehousesData";
import axios from "axios";
import {getUrl} from "../tools/utils";
import WarehousesTable from "../components/tables/WarehousesTable";
import NewWarehouseForm from "../components/forms/NewWarehouseForm";
import {wait} from "@testing-library/user-event/dist/utils";

const WarehousePage = () => {

    const {data, error, loaded} = useWarehousesData(getUrl("/mock/warehouses"));

    const {warehouses, setWarehouses} = useState(data);




    return (
        <div>
            <Navbar/>
            <Grid container>
                <Grid item xs={5}>
                    <NewWarehouseForm/>
                </Grid>
                <Grid item xs={7}>
                    {
                        loaded ?<div className={"text-center"}>

                                    <WarehousesTable/>
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

export default WarehousePage;