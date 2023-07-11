import * as React from 'react';
import {
    CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip
} from "@mui/material";
import useGetWarehouseItems from "../../hooks/useGetWarehousesItems";
import {getUrl} from "../../tools/utils";
import {useState, useEffect} from "react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteItemModal from "../modals/DeleteItemModal";

const ItemsTable = (props) => {

    const {data, error, loaded} = useGetWarehouseItems(getUrl(`/warehouses/warehouse/${props.warehouse.id}/items`));
    const [items, setItems] = useState([])

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const handleDeleteModalOpen = () => setDeleteModalOpen(true);
    const handleDeleteModalClose = () => setDeleteModalOpen(false);


    useEffect(() => {
        if (data) {
            setItems(data);
        }
    }, [data, items])

    const handleDelete = (obj) => {
        let index = 0;
        for(let i in data) {
            if(i.id === obj.id) {
                index = i;
            }
        }

        fetch(getUrl(`/warehouses/warehouse/${props.warehouse.id}/item/${obj.id}`),
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => console.log(res))
            .catch(err => console.log(err));

        setItems(items.splice(index, 1));
        console.log(items);
    }

    return (<>
        {loaded ? <TableContainer>
            <Table>
                <TableHead>
                    <TableRow key={"Header"}>
                        <TableCell align={"center"}>Name</TableCell>
                        <TableCell align={"center"}>Description</TableCell>
                        <TableCell align={"center"}>Price</TableCell>
                        <TableCell align={"center"}>Amount</TableCell>
                        <TableCell align={"center"}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((obj, i) => {
                        return <TableRow hover={true} key={i.toString()}>
                            <Tooltip title={"Click to edit"} arrow>
                                <TableCell key={`${obj.name}+${i}`} align={"center"}>{obj.name}</TableCell>
                            </Tooltip>
                            <Tooltip title={"Click to edit"} arrow>
                                <TableCell key={`${obj.description}+${i}`}
                                           align={"center"}>{obj.description}</TableCell>
                            </Tooltip>
                            <Tooltip title={"Click to edit"} arrow>
                                <TableCell key={`${obj.price}+${i}`} align={"center"}>{obj.price}</TableCell>
                            </Tooltip>
                            <Tooltip title={"Click to edit"} arrow>
                                <TableCell key={`${obj.amount}+${i}`} align={"center"}>{obj.amount}</TableCell>
                            </Tooltip>

                            <Tooltip title={"Click to delete"} arrow>
                                <TableCell key={`delete${i}`} align={"center"}>
                                    <IconButton onClick={handleDeleteModalOpen}><DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon></IconButton>
                                </TableCell>
                            </Tooltip>
                            <DeleteItemModal open={deleteModalOpen} cancel={handleDeleteModalClose}/>
                        </TableRow>

                    })}
                </TableBody>


            </Table>
        </TableContainer> : <div className={"text-center"}>
            <CircularProgress/>
        </div>

        }
    </>);
};


export default ItemsTable;