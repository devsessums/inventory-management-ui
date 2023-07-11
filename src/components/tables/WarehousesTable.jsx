import * as React from 'react';
import {useEffect, useState} from "react";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getUrl} from "../../tools/utils";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


const WarehousesTable = (props) => {

    const [data, setData] = useState(props.warehouses);
    const [warehouses, setWarehouses] = useState([]);
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);

    const viewWarehouse = (row) => {
        navigate(`/warehouse`, {state: {warehouse: row}});
    }

    useEffect(() => {
        if (data) {
            setWarehouses(data);
        }
    }, [data])

    const handleDelete = (row) => {
        fetch(getUrl(`/warehouse/${row.id}`), {
            method: 'DELETE'
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }


    return (<div>
        {warehouses ? <TableContainer>
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
                                    <TableCell><IconButton onClick={handleDelete}><DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon></IconButton></TableCell>
                                </TableRow>
                            </Tooltip>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>


            : <div> Data not loaded</div>}
    </div>);
}


export default WarehousesTable;