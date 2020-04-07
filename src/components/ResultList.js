import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import ResultDetail from '../components/ResultDetail'
import { withNavigation } from 'react-navigation'

const ResultList = ({ title, results, navigation }) => {

    if (results.length == 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={(result) => result.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('ResultsShow', { id: item.id })}>
                            <ResultDetail result={item} />
                        </TouchableOpacity>
                    )
                }}
            />

        </View>
    )
}
//ADDING NAVIGATION TO PROPS THIS FUNCTIONAL COMPONENT ^
export default withNavigation(ResultList);


const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10
    },
    container: {
        marginBottom: 15
    }

})
