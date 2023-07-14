import * as React from 'react';
import {Button, Modal, Paper} from "@mui/material";
import {getUrl} from "../../tools/utils";


const DeleteWarehouseModal = (props) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const handleDelete = (row, i) => {
        console.log(row);
        fetch(getUrl(`/warehouses/warehouse/${row.id}`), {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 204) {
                    props.handleDeleted()
                } else if (res.status === 400) {

                } else {

                }
            })
            .catch(err => console.log(err));
    }

    return (
        <Modal
            open={props.open}
        >
            <Paper sx={style}>
                <div className={"row text-center"}>
                    <h3>Are you sure you want to delete this warehouse?</h3>
                </div>
                <div className={"row mt-4 text-center"}>
                    <div className={"col-6"}>
                        <Button onClick={props.cancel} variant={"contained"}>No</Button>
                    </div>
                    <div className={"col-6"}>
                        <Button color={"error"} variant={"contained"} onClick={props.delete}>Yes</Button>
                    </div>
                </div>
            </Paper>

        </Modal>
    );
}


export default DeleteWarehouseModal;