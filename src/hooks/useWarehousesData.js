import {useEffect, useState} from "react";
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";

function useWarehousesData(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await wait(2000);
                const response = await axios.get(url)
                setData(response.data);
                setLoaded(true);
            } catch (error) {
                setError(error.message);
            }
        })();
    }, []);

    return { data, error, loaded };
};


export default useWarehousesData;