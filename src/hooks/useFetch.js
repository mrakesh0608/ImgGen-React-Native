import { useState } from "react";

const useFetch = () => {

    // const [data, setData] = useState([{ url: require('../../assets/icon.png') }, { url: require('../../assets/icon2.png') }]);
    const [data, setData] = useState(null);

    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const [firstTimeFetched, setFirstTimeFecthced] = useState(false);

    const fetchData = async ({ path, options }) => {

        // console.log(path, options);
        setIsFetching(true);
        setData(null);
        setError(null);

        try {
            const res = await fetch(path, options)
            const json = await res.json();

            // console.log(res);
            // console.log(json);

            if (json.data) {
                setData(json.data);
                setError(null);
            }
            else throw Error(json.error.message);
        }
        catch (err) {
            console.log(err);
            
            setData(null);
            setError(err.message);
        }

        setIsFetching(false);
        if (!firstTimeFetched) setFirstTimeFecthced(true);
    }

    return { fetchData, data, isFetching, error, firstTimeFetched };
}

export default useFetch;