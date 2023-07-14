import * as React from 'react';
import {
    CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip
} from "@mui/material";
import useGetWarehouseItems from "../../hooks/useGetWarehousesItems";
import {getUrl} from "../../tools/utils";
import {useState, useEffect} from "react";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteItemModal from "../modals/DeleteItemModal";
import EditItemForm from "../forms/EditItemForm";
import {useNavigate} from "react-router-dom";

const ItemsTable = (props) => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const [items, setItems] = useState([])

    const [deleted, setDeleted] = useState(false);
    const [isAdded, setIsAdded] = useState(props.isAdded);

    const [editItem, setEditItem] = useState(null);

    const handleItemUpdate = (item) => {

    }

    const [editModalOpen, setEditModalOpen] = useState(false);
    const handleEditModalOpen = () => setEditModalOpen(true);
    const handleEditModalClose = () => setEditModalOpen(false);

    useEffect(() => {
        setItems(props.warehouse.items);
        setLoaded(true);
    }, [])

    useEffect(() => {
        if(isAdded) {
            setItems(props.warehouse.items);
            props.setWarehouse({...props.warehouse, items: items})
        }
    }, [isAdded])

    const handleDelete = (obj, index) => {
        fetch(getUrl(`/warehouses/warehouse/${props.warehouse.id}/item/${obj.id}`),
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => {
                items.splice(index, 1)
                setItems([...items]);
                props.setWarehouse({...props.warehouse, size: props.warehouse.size-obj.amount, items: items});
                navigate(`/warehouse`, {state: {warehouse: props.warehouse}});;
            })
            .catch(err => console.log(err));

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
                                <TableCell key={`${obj.name}+${i}`} align={"center"} onClick={handleEditModalOpen} >{obj.name}</TableCell>
                            </Tooltip>
                            <Tooltip title={"Click to edit"} arrow>
                                <TableCell key={`${obj.description}+${i}`}
                                           align={"center"} onClick={handleEditModalOpen} >{obj.description}</TableCell>
                            </Tooltip>
                            <Tooltip title={"Click to edit"} arrow>
                                <TableCell key={`${obj.price}+${i}`} align={"center"} onClick={handleEditModalOpen}>{obj.price}</TableCell>
                            </Tooltip>
                            <Tooltip title={"Click to edit"} arrow>
                                <TableCell key={`${obj.amount}+${i}`} align={"center"} onClick={handleEditModalOpen}>{obj.amount}</TableCell>
                            </Tooltip>

                            <Tooltip title={"Click to delete"} arrow>
                                <TableCell key={`delete${i}`} align={"center"}>
                                    <IconButton onClick={() => {handleDelete(obj, i)}}><DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon></IconButton>
                                </TableCell>
                            </Tooltip>
                            <EditItemForm
                                open={editModalOpen}
                                close={handleEditModalClose}
                                warehouse={props.warehouse}
                                handleUpdate={() => {handleItemUpdate(obj)}}
                                item={obj}
                            />
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