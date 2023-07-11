import * as React from 'react';
import {Typography} from "@mui/material";
import {useState} from "react";
import Carousel from "../components/molecules/Carousel";


const LandingPage = () => {
    const [user, setUser] = useState({name: "default user"});
    return (<div className={"container-lg"} style={{"min-height": "848px"}}>

        <div className={"row justify-content-center mt-3 text-center"}>
            <Typography variant={"h3"}>Welcome {user.name}</Typography>
            <Carousel/>
        </div>

        <div className={"row text-center"}>

            <div className="d-flex flex-column align-items-center justify-content-center w-100 mt-4">
                <h4>Testimonials</h4>
                <div className="row">
                    <div className="col-md-4">
                        <p className="text-center">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum sed velit at
                            interdum.
                            Pellentesque mattis fermentum viverra. Etiam interdum, risus eget porta iaculis, felis
                            quam sagittis est, ac ornare
                            ipsum nunc non massa. Donec dapibus sem non purus rutrum.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <p className="text-center">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum sed velit at
                            interdum.
                            Pellentesque mattis fermentum viverra. Etiam interdum, risus eget porta iaculis, felis
                            quam sagittis est, ac ornare
                            ipsum nunc non massa. Donec dapibus sem non purus rutrum.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <p className="text-center">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras fermentum sed velit at
                            interdum.
                            Pellentesque mattis fermentum viverra. Etiam interdum, risus eget porta iaculis, felis
                            quam sagittis est, ac ornare
                            ipsum nunc non massa. Donec dapibus sem non purus rutrum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};


export default LandingPage;