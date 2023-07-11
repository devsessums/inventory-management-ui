import * as React from 'react';
import {useState} from "react";
import {AppBar, Box, Button, createTheme, IconButton, ThemeProvider, Toolbar, Tooltip, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import {orange} from "@mui/material/colors";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#F78F1F',
        },
    },
});

const WarehouseToolbar = () => {
    const navigate = useNavigate();

    return (<Box sx={{flexGrow: 1}}>
        <ThemeProvider theme={darkTheme}>
        <AppBar position="static" enableColorOnDark>
            <Toolbar>
                <div className={"row justify-content-evenly"}>
                    <div className={"col-lg-3"}>
                        <Tooltip title={"Go to the home page"} arrow>
                            <Button variant={"outline"}>
                                <Typography variant="h6" component="div" onClick={() => navigate("/")}>
                                    Home
                                </Typography>
                            </Button>
                        </Tooltip>
                    </div>

                    <div className={"col-lg-3"}>
                        <Tooltip title={"Go to managed warehouses"} arrow>
                            <Button variant={"outline"}>
                                <Typography variant="h6" component="div" onClick={() => navigate("/warehouses")}>
                                    Warehouses
                                </Typography>
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
        </ThemeProvider>
    </Box>);
}

export default WarehouseToolbar;