import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import yelp from '../api/yelp'
import SearchBar from '../components/SearchBar'
import ResultList from '../components/ResultList'

const SearchScreen = () => {

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


    // ONE TIME RUN
    /*   
    BAD CODE - Lead to Infinite-Loop Search 
    searchApi('pasta');
    
    /* GOOD CODE THAT RUN ONLY ON TIME */
    useEffect(() => {
        searchApi('Italian');
    }, []);



    //FILTER FUNCTION
    const FilterResultsByPrice = (price) => {
        // price $ ,$$ ,$$$
        return results.filter(result => {
            return result.price == price;
        })
    };

    return (
        <>
            <SearchBar
                term={term}
                onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <View style={styles.Error_message_view}><Text style={styles.Error_message}>{errorMessage}</Text></View> : null}

            <ScrollView>
                <ResultList
                    results={FilterResultsByPrice('$')}
                    title="Cost Effective" />
                <ResultList
                    results={FilterResultsByPrice('$$')}
                    title="Bit Pricier" />
                <ResultList
                    results={FilterResultsByPrice('$$$')}
                    title="Big Spender" />
                <ResultList
                    results={FilterResultsByPrice('$$')}
                    title="Bit Pricier" />
            </ScrollView>

        </>
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
    }
});
