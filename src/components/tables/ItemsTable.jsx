import * as React from 'react';
import {CircularProgress, Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import useGetWarehouseItems from "../../hooks/useGetWarehousesItems";
import {getUrl} from "../../tools/utils";
import {useState, useEffect} from "react";

const ItemsTable = (props) => {

    const {data, error, loaded} = useGetWarehouseItems(getUrl(`/warehouses/warehouse/${props.warehouse.id}/items`));
    const [items, setItems] = useState([])

    useEffect(() => {
        if(data) {
            setItems(data);
        }
    }, [data])

    return (<>
        {loaded ? <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>

                    {
                        items.map((obj, i) => {
                            return <TableRow key={obj.toString() + i.toString()}>

                                <TableCell>{items[i].name}</TableCell>
                                <TableCell>{items[i].sku}</TableCell>
                                <TableCell>{items[i].description}</TableCell>
                                <TableCell>{items[i].price.amount}</TableCell>
                                <TableCell>{items[i].amount}</TableCell>
                            </TableRow>
                        })
                    }


            </Table>
        </TableContainer>
        :
            <div className={"text-center"}>
                <CircularProgress/>
            </div>

        }
        </>);
};


export default ItemsTable;