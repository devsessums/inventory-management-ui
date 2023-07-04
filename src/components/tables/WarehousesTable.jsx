import * as React from 'react';
import {useEffect, useState} from "react";
import useWarehousesData from "../../hooks/useWarehousesData";
import {getUrl} from "../../tools/utils";
import {Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";

const WarehousesTable = (props) => {

    const {data, error, loaded} = useWarehousesData(getUrl("/mock/warehouses"));
    const [warehouses, setWarehouses] = useState([]);
    const navigate = useNavigate();

    const viewWarehouse = (row) => {
        navigate("/warehouse",{state: { warehouse: row } });
    }

    useEffect(() => {
        if(data) {
            const formattedWarehouses = data.map(
                (obj, i) => {
                    return {
                        id: obj.id,
                        company_name: obj.company.name,
                        address: obj.location.address,
                        capacity: obj.type.capacity,
                        size: obj.size,
                    };
                }
            );

            setWarehouses(formattedWarehouses);
        }
    }, [data])


    return (
        <div>
            {
                warehouses ?
                    <TableContainer>
                        <Table sx={{minWidth:"100%"}} aria-label={"warehouse table"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Company</TableCell>
                                    <TableCell align={"left"}>Size</TableCell>
                                    <TableCell align={"left"}>Capacity</TableCell>
                                </TableRow>
                            </TableHead>
                            {warehouses.map((obj, i) => {
                                return <TableRow key={obj.toString() + i.toString()} onClick={() => viewWarehouse(obj)}>

                                            <TableCell>{warehouses[i].company_name}</TableCell>
                                            <TableCell>{warehouses[i].size}</TableCell>
                                            <TableCell>{warehouses[i].capacity}</TableCell>
                                        </TableRow>
                            })}
                        </Table>
                    </TableContainer>


                    :
                    <div> Data not loaded</div>
            }
        </div>
    );
}


export default WarehousesTable;