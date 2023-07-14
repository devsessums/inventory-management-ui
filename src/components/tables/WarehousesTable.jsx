import * as React from 'react';
import {useEffect, useState} from "react";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {getUrl} from "../../tools/utils";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {wait} from "@testing-library/user-event/dist/utils";
import DeleteItemModal from "../modals/DeleteItemModal";
import DeleteWarehouseModal from "../modals/DeleteWarehouseModal";


const WarehousesTable = (props) => {

    const navigate = useNavigate();

    const [warehouses, setWarehouses] = useState([]);

    const viewWarehouse = (row) => {
        navigate(`/warehouse`, {state: {warehouse: row}});
    }

    const handleDelete = (row, i) => {
        console.log(row);
        fetch(getUrl(`/warehouses/warehouse/${row.id}`), {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {

                props.handleDeleted()
                props.handleDeleteIndex(i);
                return res.json()
            })
            .then(data => {
                warehouses.slice(i, 1);
                setWarehouses([...warehouses]);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        setWarehouses(props.warehouses);
    }, [props.added, props.deleted])

    return (<div>
        {warehouses ? warehouses.length !== 0 ? <TableContainer>
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
                                return (<TableRow hover={true} key={`${obj.companyName}` + i.toString()}>
                                    <Tooltip title={`Click to view ${obj.companyName}`} key={"tooltip name key " + i.toString()} arrow>
                                        <TableCell onClick={() => viewWarehouse(obj)}>{obj.companyName}</TableCell>
                                    </Tooltip>
                                    <Tooltip title={`Click to view ${obj.companyName}`} key={"tooltip size key " + i.toString()} arrow>
                                        <TableCell onClick={() => viewWarehouse(obj)}>{obj.size}</TableCell>
                                    </Tooltip>
                                    <Tooltip title={`Click to view ${obj.companyName}`}
                                             key={"tooltip capacity key " + i.toString()} arrow>
                                        <TableCell onClick={() => viewWarehouse(obj)}>{obj.capacity}</TableCell>
                                    </Tooltip>

                                    <TableCell>
                                        <Tooltip title={`Click to delete ${obj.companyName}`}
                                                 key={"tooltip delete key " + i.toString()} arrow>
                                            <IconButton
                                                onClick={() => {handleDelete(obj, i)}}><DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                : <div>There is no data yet</div>


            : <div> Data not loaded</div>}
    </div>);
}


export default WarehousesTable;