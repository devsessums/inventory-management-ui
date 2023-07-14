import * as React from 'react';
import {Button, Modal, Paper, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import usePostWarehousesData from "../../hooks/usePostWarehouseData";
import {getUrl} from "../../tools/utils";
import axios from "axios";


const NewWarehouseForm = (props) => {

    const [nameErrors, setNameErrors] = useState({text: '', error: true})
    const [capacityErrors, setCapacityErrors] = useState({text: '', error: true})
    const [addressErrors, setAddressErrors] = useState({text: '', error: true})
    const [cityErrors, setCityErrors] = useState({text: '', error: true})
    const [stateErrors, setStateErrors] = useState({text: '', error: true})
    const [zipcodeErrors, setZipcodeErrors] = useState({text: '', error: true})

    const [valid, setValid] = useState(true);

    const [companyName, setCompanyName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [response, setResponse] = useState(null);

    const [addedWarehouse, setAddedWarehouse] = useState(null);

    useEffect(()=> {
        if (!zipcodeErrors.error && !nameErrors.error && !cityErrors.error && !addressErrors.error && !stateErrors.error && !capacityErrors.error) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [companyName, capacity, address, city, state, zipcode])

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
        let id = e.target.id;
        let value = e.target.value.replaceAll(' ', '');
        switch (id) {
            case "name":
                setCompanyName(value);
                if (value.length === 0) {
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
                setCapacity(value);
                if (value.length === 0) {
                    setCapacityErrors({
                        text: "Must enter a number", error: true
                    });
                } else {
                    if (parseInt(value) >= 20 && parseInt(value) <= 2147483647) {
                        setCapacityErrors({
                            text: "", error: false
                        });
                    } else if(parseInt(value) > 2147483647) {
                        setCapacityErrors({
                            text: "Must enter a number less than 2147483647", error: true
                        });
                    } else if (parseInt(value) < 20) {
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
                setAddress(value);
                if (value.length === 0) {
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
                setCity(value);
                if (value.length === 0) {
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
                setState(value);
                if (value.length === 0) {
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
                setZipcode(value);
                if (value.length === 5 && parseInt(value) <= 99999 && parseInt(value) > 0) {
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

    // clearing all form errors on modal cancel
    const handleCancel = (e) => {
        setNameErrors({text: '', error: true});
        setCapacityErrors({text: '', error: true});
        setAddressErrors({text: '', error: true});
        setCityErrors({text: '', error: true});
        setStateErrors({text: '', error: true});
        setZipcodeErrors({text: '', error: true})
        setCompanyName('');
        setCapacity('');
        setAddress('');
        setCity('');
        setState('');
        setZipcode('');
        setValid(false);
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
            }).then(res =>{
                console.log(res)
                setResponse(res);
                return res.json();
            }).then(data => {
                props.added();
                props.addWarehouse(data);
                props.handleSnackMessage(response);
                props.handleSnackOpen();
                props.handleClose();
            }).catch(err => {
                console.error(err);
                props.handleSnackMessage(err);
                props.handleSnackOpen();
                props.handleClose();
            })
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
                        helperText={nameErrors.text}
                        error={nameErrors.error}
                        id={"name"}
                        label={"Company Name"}
                        variant={"outlined"}
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
                    />
                </div>
                <div className={"row mb-3"}>
                    <TextField
                        required
                        helperText={zipcodeErrors.text}
                        error={zipcodeErrors.error}
                        id={"zipcode"}
                        label={"Zipcode"}
                        variant={"outlined"}
                        inputProps={{inputMode: 'numeric', pattern: '[0-9][0-9][0-9][0-9][0-9]'}}
                    />
                </div>
                <div className={"row mt-3"}>
                    <div className={"col-lg-6"}>
                        <Button type={"submit"} onClick={handleSubmit} variant={"contained"} disabled={!valid} >Add</Button>
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