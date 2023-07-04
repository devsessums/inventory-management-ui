import * as React from 'react';
import Navbar from "../components/navs/Navbar";
import {useLocation, useNavigate} from "react-router-dom";

const WarehousePage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    let warehouse = null;

    if(location.state && location.state.warehouse) {
        warehouse = location.state.warehouse;
        console.log(warehouse);
    }

    return (
        <div>
            <Navbar/>
            <div className={"container-sm mt-4"}>
                <div className={"row"}>
                    <div className={"col-sm-4 col-lg-4 text-center border"}>
                        <img src={"warehouse1.jpg"} width={"200px"} height={"200px"}/>
                    </div>
                    <div className={"col-sm-8 col-lg-8 text-center border"}>
                        <div className={"row"}>
                            <div className={"row"}>
                                <div className={"col-sm-12 text-center p-3"}> {warehouse.company_name} </div>
                            </div>

                            <div className={"row"}>
                                <div className={"col-sm-12 text-center p-3"}> {warehouse.address} </div>
                            </div>

                            <div className={"row p-3"}>
                                <div className={"col-sm-4 text-center"}> City Name </div>
                                <div className={"col-sm-4 text-center"}> State </div>
                                <div className={"col-sm-4 text-center"}>Zip Code</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={"row border"}>

                    <div className={"row text-center"}>
                        <div className={"col-lg-3"}>
                            sku
                        </div>

                        <div className={"col-lg-3"}>
                            name
                        </div>

                        <div className={"col-lg-3"}>
                            description
                        </div>

                        <div className={"col-lg-3"}>
                            amount
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default WarehousePage;