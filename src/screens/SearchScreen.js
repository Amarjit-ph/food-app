import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SearchBar from '../components/SearchBar'
import useResults from '../hooks/useResults'
import yelp from '../api/yelp'

const SearchScreen = () => {

    const [term, setTerm] = useState('');
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


    return (
        <View>
            <SearchBar
                term={term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={searchApi}
            />
            {errorMessage ? <View style={styles.Error_message_view}><Text style={styles.Error_message}>{errorMessage}</Text></View> : null}
            <View style={styles.Result_message_view}><Text style={styles.Result_message}> We have Found {results.length} Results</Text></View>

        </View>
    )
}

export default SearchScreen
const styles = StyleSheet.create({
    Container_view: {
        margin: 15,
    },
    Error_message_view: {
        color: 'red',
        fontSize: 15,
        margin: 15,
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 5,
        alignSelf: 'stretch',
    },
    Error_message: {
        alignSelf: 'center',
        color: 'red'
    },
    Result_message_view: {
        color: 'green',
        fontSize: 15,
        margin: 15,
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 5,
        alignSelf: 'stretch',
    },
    Result_message: {
        alignSelf: 'center',
        color: 'green'
    },
});
