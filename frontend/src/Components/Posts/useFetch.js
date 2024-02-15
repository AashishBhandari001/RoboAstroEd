import { useEffect, useState } from 'react';
import axios from 'axios';


export default function useFetch(url) {
    const [data, setData] = useState(null);
    useEffect(() => {
        function loadData() {
            axios
            .get(url)
            .then((response) => {
            const posts = response.data;
            setData(posts);
            });
        }

        loadData();
    }, [url]);
    console.log(data);
    return data;
}