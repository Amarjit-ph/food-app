import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import yelp from '../api/yelp'


const ResultShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);

    // FUNCTION TO GET INFORMATION ABOUT ID
    const id = navigation.getParam('id');
    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
    }

    //ONE TIME CALL
    useEffect(() => {
        getResult(id);
    }, []);

    //CHECK RESULT
    if (!result) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.title_view}><Text style={styles.title}>{result.name}</Text></View>

            <FlatList
                data={result.photos}
                keyExtractor={(photo) => photo}
                renderItem={({ item }) => {
                    return <Image style={styles.image} source={{ uri: item }} />
                }}
            />
        </View>
    )
}

export default ResultShowScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        alignItems: 'center'
    },
    image: {
        height: 220,
        width: 380,
        marginBottom: 9
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    title_view: {
        borderWidth: 3,
        borderColor: 'black',
        alignSelf: 'stretch',
        marginBottom: 10
    }

})
