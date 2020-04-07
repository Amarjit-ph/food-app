import { useEffect, useState } from 'react'
import yelp from '../api/yelp'

export default () => {


    const [term, setTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [results, setResults] = useState([]);

    const searchApi = async (term) => {
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
            console.log('API ERROR');
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