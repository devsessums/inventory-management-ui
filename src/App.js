import * as React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import WarehousePage from "./pages/WarehousePage";
import LandingPage from "./pages/LandingPage";
import WarehousesPage from "./pages/WarehousesPage";
import WarehouseToolbar from "./components/navs/WarehouseToolbar";


function App() {
    return (<div sx={{padding: 0, margin: 0, gutters: 0}}>

            <BrowserRouter>
                <WarehouseToolbar/>
                <Routes>
                    <Route exact path="/" element={<LandingPage/>}/>
                    <Route path="/warehouses" element={<WarehousesPage/>}/>
                    <Route path="/warehouse" element={<WarehousePage/>}/>

                </Routes>
            </BrowserRouter>
        </div>);
}


export default App;
