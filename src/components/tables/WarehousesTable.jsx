import * as React from 'react';
import {useEffect, useState} from "react";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getUrl} from "../../tools/utils";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {wait} from "@testing-library/user-event/dist/utils";


const WarehousesTable = (props) => {

    const [data, setData] = useState(props.warehouses);
    const [warehouses, setWarehouses] = useState([]);
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);

    const viewWarehouse = (row) => {
        navigate(`/warehouse`, {state: {warehouse: row}});
    }

    useEffect(() => {
        setWarehouses(props.warehouses);
    }, [props.added, props.deleted])

    const handleDelete = (row) => {
        console.log(row);
        fetch(getUrl(`/warehouses/warehouse/${row.id}`), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(
                res => {
                    if(res.status === 204) {
                        props.handleDeleted()
                    } else if (res.status === 400) {

                    } else {

                    }
                }
            )
            .catch(err => console.log(err));
    }


    return (<div>
        {warehouses ?
            warehouses.length !== 0 ?
            <TableContainer>
                <Table sx={{minWidth: "100%"}} aria-label={"warehouse table"}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Company</TableCell>
                            <TableCell align={"left"}>Size</TableCell>
                            <TableCell align={"left"}>Capacity</TableCell>
                            <TableCell align={"left"}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {warehouses.map((obj, i) => {
                            return <Tooltip title={`Click to view ${obj.companyName}`} key={"tooltip key " + i.toString()} placement={"top"} arrow>
                                <TableRow hover={true} key={"key " + i.toString()} >
                                    <TableCell onClick={() => viewWarehouse(obj)}>{obj.companyName}</TableCell>
                                    <TableCell onClick={() => viewWarehouse(obj)}>{obj.size}</TableCell>
                                    <TableCell onClick={() => viewWarehouse(obj)}>{obj.capacity}</TableCell>
                                    <TableCell><IconButton onClick={() => handleDelete(obj)}><DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon></IconButton></TableCell>
                                </TableRow>
                            </Tooltip>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        : <div>There is no data yet</div>


            : <div> Data not loaded</div>}
    </div>);
}


export default WarehousesTable;