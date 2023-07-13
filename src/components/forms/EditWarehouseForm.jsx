import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {getUrl} from "../../tools/utils";
import {Button, Modal, Paper, TextField} from "@mui/material";


const EditWarehouseForm = (props) => {

    const [warehouse, setWarehouse] = useState(props.payload);

    const [nameErrors, setNameErrors] = useState({text: '', error: false})
    const [capacityErrors, setCapacityErrors] = useState({text: '', error: false})
    const [addressErrors, setAddressErrors] = useState({text: '', error: false})
    const [cityErrors, setCityErrors] = useState({text: '', error: false})
    const [stateErrors, setStateErrors] = useState({text: '', error: false})
    const [zipcodeErrors, setZipcodeErrors] = useState({text: '', error: false})

    const [valid, setValid] = useState(true);

    const [companyName, setCompanyName] = useState(warehouse.companyName);
    const [capacity, setCapacity] = useState(warehouse.capacity);
    const [address, setAddress] = useState(warehouse.address);
    const [city, setCity] = useState(warehouse.city);
    const [state, setState] = useState(warehouse.state);
    const [zipcode, setZipcode] = useState(warehouse.zipcode);

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

    useEffect(()=> {
        if (!zipcodeErrors.error && !nameErrors.error && !cityErrors.error && !addressErrors.error && !stateErrors.error && !capacityErrors.error) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [companyName, capacity, address, city, state, zipcode])

    const handleChange = (e) => {
        switch (e.target.id) {
            case "name":
                setCompanyName(e.target.value);
                if (e.target.value.length === 0) {
                    setNameErrors({
                        text: "Must enter a name", error: true
                    });
                } else {
                    setNameErrors({
                        text: "", error: false
                    });
                }
                break;

            case "capacity":
                setCapacity(e.target.value);
                if (e.target.value.length === 0) {
                    setCapacityErrors({
                        text: "Must enter a number", error: true
                    });
                } else {
                    if (parseInt(e.target.value) >= 20) {
                        setCapacityErrors({
                            text: "", error: false
                        });
                    } else if (parseInt(e.target.value) < 20) {
                        setCapacityErrors({
                            text: "Must enter a number greater than 20", error: true
                        });
                    } else {
                        setCapacityErrors({
                            text: "Must enter a positive number", error: true
                        });
                    }
                }
                break;

            case "address":
                setAddress(e.target.value);
                if (e.target.value.length === 0) {
                    setAddressErrors({
                        text: "Must enter an address", error: true
                    });
                } else {
                    setAddressErrors({
                        text: "", error: false
                    });
                }
                break;

            case "city":
                setCity(e.target.value);
                if (e.target.value.length === 0) {
                    setCityErrors({
                        text: "Must enter a city", error: true
                    });
                } else {
                    setCityErrors({
                        text: "", error: false
                    });
                }
                break;

            case "state":
                setState(e.target.value);
                if (e.target.value.length === 0) {
                    setStateErrors({
                        text: "Must enter a state", error: true
                    });
                } else {

                    setStateErrors({
                        text: "", error: false
                    });
                }
                break;

            case "zipcode":
                setZipcode(e.target.value);
                if (e.target.value.length === 5) {
                    setZipcodeErrors({
                        text: "", error: false
                    });
                } else {
                    setZipcodeErrors({
                        text: "Must enter a five digit zipcode", error: true
                    });
                }
                break;
        }


    }

    const handleCancel = (e) => {
        setNameErrors({text: '', error: false});
        setCapacityErrors({text: '', error: false});
        setAddressErrors({text: '', error: false});
        setCityErrors({text: '', error: false});
        setStateErrors({text: '', error: false});
        setZipcodeErrors({text: '', error: false})
        setCompanyName(warehouse.companyName);
        setCapacity(warehouse.capacity);
        setAddress(warehouse.address);
        setCity(warehouse.city);
        setState(warehouse.state);
        setZipcode(warehouse.zipcode);
        setValid(true);
        props.handleClose()
    }

    const handleSubmit = (e) => {
        console.log("updating");

        if (valid) {
            const newPayload = {
                'id': warehouse.id,
                'companyName': companyName,
                'capacity': capacity,
                'address': address,
                'city': city,
                'state': state,
                'zipcode': zipcode,
                'items': warehouse.items
            }
            e.preventDefault();
            fetch(getUrl("/warehouses/warehouse"), {
                headers: {
                    'Content-Type': 'application/json'
                }, method: "PUT", body: JSON.stringify(newPayload)
            })
                .then(res => {
                    console.log("res: ", res);
                    return res.json()
                })
                .then(body => {
                    props.handleSnackMessage({
                        response: {
                            data: "Successfully Updated"
                        },
                        status: 204
                    });
                    props.handleSnackOpen(true);
                    props.handleUpdate(body);
                    props.handleClose()
                })
                .catch(err => {
                    console.log(err)
                    props.handleSnackMessage({
                        response: {
                            data: "Not Updated"
                        },
                        status: 400
                    });
                    props.handleSnackOpen(true);
                });
        } else {
            props.handleSnackMessage({
                response: {
                    data: "Form not Valid or not completed"
                },
                status: 400
            });
            props.handleSnackOpen(true);
        }
    };

    return (<Modal
        open={props.open}

    >
        <Paper sx={style}>
            <div className={"container text-center"} onChange={handleChange}>
                <div className={"row mb-3"}>
                    <h4>Edit Warehouse Form</h4>
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={nameErrors.text}
                        error={nameErrors.error}
                        id={"name"}
                        label={"Company Name"}
                        variant={"outlined"}
                        defaultValue={companyName}
                    />
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={capacityErrors.text}
                        error={capacityErrors.error}
                        id={"capacity"}
                        label={"Capacity"}
                        variant={"outlined"}
                        defaultValue={capacity}
                    />
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={addressErrors.text}
                        error={addressErrors.error}
                        id={"address"}
                        label={"Address"}
                        variant={"outlined"}
                        defaultValue={address}
                    />
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={cityErrors.text}
                        error={cityErrors.error}
                        id={"city"}
                        label={"City"}
                        variant={"outlined"}
                        defaultValue={city}
                    />
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={stateErrors.text}
                        error={stateErrors.error}
                        id={"state"}
                        label={"State"}
                        variant={"outlined"}
                        defaultValue={state}/>
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={zipcodeErrors.text}
                        error={zipcodeErrors.error}
                        id={"zipcode"}
                        label={"Zipcode"}
                        variant={"outlined"}
                        defaultValue={zipcode}
                    />
                </div>
                <div className={"row mt-3"}>
                    <div className={"col-lg-6"}>
                        <Button type={"submit"} onClick={handleSubmit} variant={"contained"}
                                disabled={!valid}>Save</Button>
                    </div>

                    <div className={"col-lg-6"}>
                        <Button color={"error"} variant={"contained"} onClick={handleCancel}>Cancel</Button>
                    </div>

                </div>

            </div>
        </Paper>
    </Modal>);

}

export default EditWarehouseForm;