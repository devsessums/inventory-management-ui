import * as React from 'react';
import {useEffect, useState} from "react";
import {Box, Button, FormGroup, Modal, Paper, Slide, TextField, Typography} from "@mui/material";
import axios from "axios";
import {getUrl} from "../../tools/utils";

const NewItemForm = (props) => {

    // new item values from form
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');

    // handles validation error messages
    const [nameErrors, setNameErrors] = useState({text: '', error: true});
    const [descriptionErrors, setDescriptionErrors] = useState({text: '', error: true});
    const [priceErrors, setPriceErrors] = useState({text: '', error: true});
    const [amountErrors, setAmountErrors] = useState({text: '', error: true});

    // if new item form is valid, by default form is not submittable
    const [valid, setValid] = useState(false);

    // handles form validation from item properties
    useEffect(() => {
        console.log("here")
        if(!nameErrors.error && !descriptionErrors.error && !priceErrors.error && !amountErrors.error) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [name, description, price, amount])

    const handleCancel = () => {
        setNameErrors({text: '', error: true});
        setDescriptionErrors({text: '', error: true});
        setPriceErrors({text: '', error: true});
        setAmountErrors({text: '', error: true});
        setName('');
        setDescription('');
        setPrice('');
        setAmount('');
        setValid(false);
        props.handleClose()
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(valid) {
            const newItem = {
                name: name, description: description, price: price, amount: amount
            }
            console.log(newItem);
            console.log()
            fetch(getUrl(`/warehouses/warehouse/${props.warehouse.id}/item`), {
                headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify(newItem)
            })
                .then(res => {
                    if(res.status === 202) {
                        return res.json();
                    } else {
                        //throw new Error("Item add unsuccessful");
                        return {
                            response: {
                                data: "Item add unsuccessful",
                            },
                            status: res.status
                        };
                    }

                })
                .then(body => {
                    if(body?.id) {
                        props.push(body);
                    } else {
                        props.handleClose();
                    }
                })
                .catch(props.handleClose());
        } else {
            console.log("form is not valid");
        }
    };

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value.replaceAll(" ", '');
        console.log(value)
        switch (id) {
            case "name":
                setName(value);
                if(value.length !== 0) {
                    setNameErrors({
                        text: '',
                        error: false
                    });
                } else {
                    setNameErrors({
                       text: "Must enter a name",
                       error: true
                    });
                }
                break;


            case "description":
                setDescription(value);
                if(value.length !== 0) {
                    setDescriptionErrors({
                        text: '',
                        error: false
                    });
                } else {
                    setDescriptionErrors({
                        text: "Must enter a description",
                        error: true
                    });
                }
                break;

            case "price":
                setPrice(value);
                if(value.length !== 0) {
                    if(parseFloat(value)  <= 0 ) {
                        setPriceErrors({
                            text: 'Enter a number greater than 0',
                            error: true
                        });
                    } else if(parseFloat(value) > 0) {
                        setPriceErrors({
                            text: '',
                            error: false
                        });
                    }   else {
                        setPriceErrors({
                            text: 'Must enter a number',
                            error: true
                        });
                    }
                } else {

                    setPriceErrors({
                        text: "Must enter a number",
                        error: true
                    });
                }
                break;

            case "amount":
                setAmount(value);
                if(value.length !== 0) {
                    if(parseInt(value) <= 0) {
                        setAmountErrors({
                            text: 'Enter a number greater than 0',
                            error: true
                        });
                    } else if(parseInt(value) > 0) {
                        if(props.warehouse.size + parseInt(value) > props.warehouse.capacity) {
                            setAmountErrors({
                                text: 'Exceeds capacity',
                                error: true
                            });
                        } else {
                            setAmountErrors({
                                text: '', error: false
                            });
                        }
                    } else {
                        setAmountErrors({
                            text: 'Enter a number',
                            error: true
                        });
                    }
                } else {
                    setAmountErrors({
                        text: 'Enter a number',
                        error: true
                    });
                }
                break;
        }
    }

    return (<>
        <Modal
            open={props.open}
        >
            <Paper sx={style}>
                <div className={"row text-center m-3"}>
                    <Typography variant={"h5"}>New Item</Typography>
                </div>

                <FormGroup onChange={handleChange}>
                    <div className={"row text-center"}>
                        <div className={"col-6-lg"}>
                            <TextField
                                required
                                error={nameErrors.error}
                                helperText={nameErrors.text}
                                id={"name"}
                                label={"Name"}
                                variant={"filled"}
                                size={"small"}
                            />
                        </div>
                    </div>
                    <div className={"row text-center"}>
                        <div className={"col-6-lg"}>
                            <TextField
                                required
                                error={descriptionErrors.error}
                                helperText={descriptionErrors.text}
                                id={"description"}
                                label={"Description"}
                                variant={"filled"}/>
                        </div>

                    </div>
                    <div className={"row text-center"}>
                        <div className={"col-6-lg"}>
                            <TextField
                                required
                                error={priceErrors.error}
                                helperText={priceErrors.text}
                                id={"price"}
                                label={"Price"}
                                variant={"filled"}/>
                        </div>
                        <div className={"col-6-lg"}>
                            <TextField
                                required
                                error={amountErrors.error}
                                helperText={amountErrors.text}
                                id={"amount"}
                                label={"Amount"}
                                variant={"filled"}/>
                        </div>
                    </div>

                </FormGroup>

                <div className={"row text-center mt-3"}>
                    <div className={"col-lg-6"}>
                        <Button variant={"contained"} onClick={handleSubmit} disabled={!valid}>Add Item</Button>
                    </div>
                    <div className={"col-lg-6"}>
                        <Button color={"error"} variant={"contained"} onClick={handleCancel}>Cancel</Button>
                    </div>
                </div>

            </Paper>

        </Modal>
    </>);
};

export default NewItemForm;