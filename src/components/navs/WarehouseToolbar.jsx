import * as React from 'react';
import {useState} from "react";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import {orange} from "@mui/material/colors";


const WarehouseToolbar = () => {
    const navigate = useNavigate();

    return (<Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>
                <div className={"row justify-content-evenly"}>
                    <div className={"col-lg-3"}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </div>
                    <div className={"col-lg-3"}>
                        <Button variant={"outline"}>
                            <Typography variant="h6" component="div" onClick={() => navigate("/")}>
                                Home
                            </Typography>
                        </Button>
                    </div>

                    <div className={"col-lg-3"}>
                        <Button variant={"outline"}>
                            <Typography variant="h6" component="div" onClick={() => navigate("/warehouses")}>
                                Warehouses
                            </Typography>
                        </Button>
                    </div>


                    {/*<div className={"col-lg-3"}>*/}
                    {/*    <Button variant={"outline"}>*/}
                    {/*        <Typography variant="h6" component="div">*/}
                    {/*            Login*/}
                    {/*        </Typography>*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>
            </Toolbar>
        </AppBar>
    </Box>);
}

export default WarehouseToolbar;