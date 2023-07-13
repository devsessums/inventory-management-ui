import * as React from 'react';
import {Button, Modal, Paper, Typography} from "@mui/material";



const DeleteItemModal = (props) => {

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

    return (
        <Modal
            open={props.open}
        >
            <Paper sx={style}>
                <div className={"row text-center"}>
                    <h3>Are you sure you want to delete this item?</h3>
                </div>
                <div className={"row mt-4 text-center"}>
                    <div className={"col-6"}>
                        <Button onClick={props.cancel} variant={"contained"}>No</Button>
                    </div>
                    <div className={"col-6"}>
                        <Button color={"error"} variant={"contained"}>Yes</Button>
                    </div>
                </div>
            </Paper>

        </Modal>
    );
};



export default DeleteItemModal;