import {useEffect, useState} from "react";
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";
import {getUrl} from "../tools/utils";

// hooks never actually used
function useWarehousesData(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const headers = { 'METHOD': 'GET', 'Content-Type': 'application/json' }
                await wait(2000);
                const response = await fetch(url, {headers})
                    .then(res=> res.json())
                    .then(data => setData(data))

                setLoaded(true);
            } catch (error) {
                setError(error.message);
            }
        })();
    }, []);

    return { data, error, loaded };
};


export default useWarehousesData;