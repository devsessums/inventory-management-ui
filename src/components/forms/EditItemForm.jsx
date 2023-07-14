import * as React from 'react';
import {Button, FormGroup, Modal, Paper, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getUrl} from "../../tools/utils";



const EditItemForm = (props) => {

    const [item, setItem] = useState(props.item)

    // new item values from form
    const [name, setName] = useState(props.item.name);
    const [description, setDescription] = useState(props.item.description);
    const [price, setPrice] = useState(props.item.price);
    const [amount, setAmount] = useState(props.item.amount);

    // handles validation error messages
    const [nameErrors, setNameErrors] = useState({text: '', error: false});
    const [descriptionErrors, setDescriptionErrors] = useState({text: '', error: false});
    const [priceErrors, setPriceErrors] = useState({text: '', error: false});
    const [amountErrors, setAmountErrors] = useState({text: '', error: false});

    // if new item form is valid, by default form is not submittable
    const [valid, setValid] = useState(false);

    console.log(props.item)
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
        setNameErrors({text: '', error: false});
        setDescriptionErrors({text: '', error: false});
        setPriceErrors({text: '', error: false});
        setAmountErrors({text: '', error: false});
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setAmount(item.amount);
        setValid(true);
        props.close()
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

    const handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value.replaceAll(" ", '');
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
                if(value.length !== 0) {
                    if(parseInt(value) <= 0) {
                        setAmountErrors({
                            text: 'Enter a number greater than 0',
                            error: true
                        });
                    } else if(parseInt(value) > 0) {
                        if(props.warehouse.size - (parseInt(amount) + parseInt(value)) > props.warehouse.capacity) {
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
                setAmount(value);
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(valid) {
            const newItem = {
                id: item.id,
                name: name, description: description, price: price, amount: amount
            }
            fetch(getUrl(`/warehouses/warehouse/${props.warehouse.id}/item/${item.id}`), {
                headers: {'Content-Type': 'application/json'}, method: 'PUT', body: JSON.stringify(newItem)
            })
                .then(res => res.json())
                .then(data => {
                    props.close()
                })
                .catch(err => console.log(err));
        }
    };

    return (
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
                                defaultValue={name}
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
                                variant={"filled"}
                                defaultValue={description}
                            />
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
                                variant={"filled"}
                                defaultValue={price}
                            />
                        </div>
                        <div className={"col-6-lg"}>
                            <TextField
                                required
                                error={amountErrors.error}
                                helperText={amountErrors.text}
                                id={"amount"}
                                label={"Amount"}
                                variant={"filled"}
                                defaultValue={amount}
                            />
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
        )
}


export default EditItemForm;