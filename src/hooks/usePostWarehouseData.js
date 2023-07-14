import axios from "axios";
//import {wait} from "@testing-library/user-event/dist/utils";
import {useEffect, useState} from "react";

function usePostWarehousesData(url, warehouse) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                //await wait(2000);
                const response = await axios.post(url, warehouse)
                setData(response.data);
                setLoaded(true);
            } catch (error) {
                setError(error.message);
            }
        })();
    }, []);

    return { data, error, loaded };
};

export default usePostWarehousesData;