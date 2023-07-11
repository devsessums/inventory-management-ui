import * as React from 'react';
import {Button, Modal, Paper, TextField} from "@mui/material";
import {useState} from "react";
import usePostWarehousesData from "../../hooks/usePostWarehouseData";
import {getUrl} from "../../tools/utils";
import axios from "axios";


const NewWarehouseForm = (props) => {
    const [errors, setErrors] = useState({
        name: {text: '', error: false},
        capacity: {text: '', error: false},
        address: {text: '', error: false},
        city: {text: '', error: false},
        state: {text: '', error: false},
        zipcode: {text: '', error: false}
    });

    const [companyName, setCompanyName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    const [valid, setValid] = useState(false);

    // const payload = {
    //     "companyName": '', capacity: '', address: '', city: '', state: '', zipcode: ''
    // };


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

    const handleChange = (e) => {

        switch (e.target.id) {
            case "name":
                if (e.target.value.length === 0) {
                    errors.name.text = "Must enter a name";
                    errors.name.error = true;
                } else {
                    setCompanyName(e.target.value);
                    errors.name.text = "";
                    errors.name.error = false;
                }
                break;

            case "capacity":
                if (e.target.value.length === 0) {
                    errors.capacity.text = "Must enter a number";
                    errors.capacity.error = true;

                } else {
                    if (parseInt(e.target.value) > 0) {
                        setCapacity(parseInt(e.target.value));
                        errors.capacity.text = "";
                        errors.capacity.error = false;
                    } else {
                        errors.capacity.text = "Must enter a positive number";
                        errors.capacity.error = true;
                    }
                }
                break;

            case "address":
                if (e.target.value.length === 0) {
                    errors.address.text = "Must enter an address";
                    errors.address.error = true;
                } else {
                    setAddress(e.target.value);
                    errors.address.text = "";
                    errors.address.error = false;
                }
                break;

            case "city":
                if (e.target.value.length === 0) {
                    errors.city.text = "Must enter a city";
                    errors.city.error = true;
                } else {
                    setCity(e.target.value);
                    errors.city.text = "";
                    errors.city.error = false;
                }
                break;

            case "state":
                if (e.target.value.length === 0) {
                    errors.state.text = "Must enter a state";
                    errors.state.error = true;
                } else {
                    setState(e.target.value);
                    errors.state.text = "";
                    errors.state.error = false;
                }
                break;

            case "zipcode":
                if (e.target.value.length !== 5) {
                    errors.zipcode.text = "Must enter a five digit zipcode";
                    errors.zipcode.error = true;
                } else {
                    setZipcode(e.target.value);
                    errors.zipcode.text = "";
                    errors.zipcode.error = false;
                }
                break;
        }
        if(!errors.name.error && !errors.city.error &&
           !errors.address.error && !errors.state.error &&
           !errors.zipcode.error && !errors.capacity.error) {
            setValid(true);
        }
    }

    // clearing all form errors on modal cancel
    const handleCancel = (e) => {
        for (let attr in errors) {
            errors[attr] = {text: '', error: false}
        }
        props.handleClose()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            "companyName": companyName,
            "capacity": capacity,
            "address": address,
            "city": city,
            "state": state,
            "zipcode": zipcode
        }
        if (valid) {
            fetch(getUrl("/warehouses/warehouse"), {
                headers: {
                    "Content-Type": "application/json"
                }, method: "POST", body: JSON.stringify(payload)
            })
                .then(res => {
                    if (res.status === 201) {
                        props.handleSnackMessage({
                            response: {
                                data: "Warehouse added"
                            },
                            status: 201
                        });
                    } else if (res.status === 406) {
                        props.handleSnackMessage({
                            response: {
                                data: `HTTP status ${res.status}`
                            }
                        });
                    }
                    else {
                        props.handleSnackMessage({
                            response: {
                                data: `HTTP status ${res.status}`
                            }
                        });
                    }
                    props.handleSnackOpen(true);
                })
                .catch(err => {
                    props.handleSnackMessage(err);
                    props.handleSnackOpen(true);
                });
        } else {
            props.handleSnackMessage({
                response: {
                    data: "Form not valid or filled out completely"
                }, status: 400
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
                    <TextField
                        required
                        helperText={errors.name.text}
                        error={errors.name.error}
                        id={"name"}
                        label={"Company Name"}
                        variant={"outlined"}
                    />
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={errors.capacity.text}
                        error={errors.capacity.error}
                        id={"capacity"}
                        label={"Capacity"}
                        variant={"outlined"}
                    />
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={errors.address.text}
                        error={errors.address.error}
                        id={"address"}
                        label={"Address"}
                        variant={"outlined"}
                    />
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={errors.city.text}
                        error={errors.city.error}
                        id={"city"}
                        label={"City"}
                        variant={"outlined"}
                    />
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={errors.state.text}
                        error={errors.state.error}
                        id={"state"}
                        label={"State"}
                        variant={"outlined"}
                    />
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={errors.zipcode.text}
                        error={errors.zipcode.error}
                        id={"zipcode"}
                        label={"Zipcode"}
                        variant={"outlined"}
                        inputProps={{inputMode: 'numeric', pattern: '[0-9][0-9][0-9][0-9][0-9]'}}
                    />
                </div>
                <div className={"row mt-3"}>
                    <div className={"col-lg-6"}>
                        <Button type={"submit"} onClick={handleSubmit} variant={"contained"} >Add</Button>
                    </div>

                    <div className={"col-lg-6"}>
                        <Button color={"error"} variant={"contained"} onClick={handleCancel}>Cancel</Button>
                    </div>

                </div>

            </div>
        </Paper>
    </Modal>);
}


export default NewWarehouseForm;