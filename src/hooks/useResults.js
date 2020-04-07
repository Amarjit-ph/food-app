import { useEffect, useState } from 'react'
import yelp from '../api/yelp'

export default () => {

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async () => {
        try {
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: term,
                    location: 'san jose'
                }
            });
            setResults(response.data.businesses);
            console.log("SEARCH API");

        } catch (err) {
            setErrorMessage('NETWORK ERROR');
        }
    }

    /*   
    BAD CODE - Lead to Infinite-Loop Search 
    searchApi('pasta');
    

    /* GOOD CODE THAT RUN ONLY ON TIME */
    useEffect(() => {
        searchApi('Pasta');
    }, []);

    return [searchApi, results, errorMessage];
};