import * as React from 'react';
import {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";

const WarehousesTable = (props) => {

    const [data, setData] = useState(props.warehouses);
    const [warehouses, setWarehouses] = useState([]);
    const navigate = useNavigate();

    const viewWarehouse = (row) => {
        //navigate(`/warehouse/${row.company_name.replaceAll(' ', '_')}`, {state: {warehouse: row}});
        navigate(`/warehouse`, {state: {warehouse: row}});

    }

    useEffect(() => {
        if (data) {
            const formattedWarehouses = data.map((obj, i) => {
                return {
                    id: obj.id,
                    company_name: obj.company.name,
                    address: obj.location.address,
                    capacity: obj.type.capacity,
                    size: obj.size,
                };
            });

            setWarehouses(formattedWarehouses);
        }
    }, [data])


    return (<div>
            {warehouses ? <TableContainer>
                    <Table sx={{minWidth: "100%"}} aria-label={"warehouse table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Company</TableCell>
                                <TableCell align={"left"}>Size</TableCell>
                                <TableCell align={"left"}>Capacity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {warehouses.map((obj, i) => {
                            return <TableRow hover={true} key={i.toString()} onClick={() => viewWarehouse(obj)}>

                                <TableCell>{obj.company_name}</TableCell>
                                <TableCell>{obj.size}</TableCell>
                                <TableCell>{obj.capacity}</TableCell>
                            </TableRow>
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>


                : <div> Data not loaded</div>}
        </div>);
}


export default WarehousesTable;