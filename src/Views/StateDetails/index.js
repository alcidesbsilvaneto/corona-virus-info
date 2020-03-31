import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import Axios from 'axios';

const StateDetails = ({ route, navigation }) => {
    const [loadingStateVirusInfo, setLoadingStateVirusInfo] = useState(true)
    const [stateVirusInfo, setstateVirusInfo] = useState({})
    const [noStateData, setNoStateData] = useState(false)
    useEffect(() => {
        getStateVirusInfo(route.params.state)
    }, []);

    async function getStateVirusInfo(state = 'SP') {
        try {
            let response = await Axios.get(`https://brasil.io/api/dataset/covid19/caso/data?is_last=True&state=${state}&is_last=True`)
            console.log(response)
            setstateVirusInfo(response.data.results);
            setLoadingStateVirusInfo(false);
        } catch (error) {
            console.log(error);
        }
    }

    function Item({ data }) {
        return (
            <View style={styles.item}>
                <Text>Cidade: {data.city}</Text>
                <Text style={{ marginTop: 5 }}>Casos: <Text style={{ color: 'red', fontWeight: 'bold' }}>{data.confirmed}</Text>. Mortes: <Text style={{ color: 'red', fontWeight: 'bold' }}>{data.deaths}</Text></Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.rootContainer}>
            <View style={styles.generalInfoContainer}>
                {
                    loadingStateVirusInfo ?
                        <Text>Buscando informações</Text>
                        :
                        <FlatList
                            data={stateVirusInfo}
                            style={{ width: '100%' }}
                            ListHeaderComponent={() => <View style={{ width: '100%', alignItems: 'center' }}><Text>Dados mais recentes do estado ({route.params.state}): </Text></View>}
                            contentContainerStyle={{ width: '100%', paddingTop: 20 }}
                            renderItem={({ item }) => <Item data={item} />}
                            keyExtractor={item => item.id}
                        />
                }
            </View>
        </SafeAreaView>
    )
}

export default StateDetails;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        width: '100%'
    },
    stateInfoContainer: {
        backgroundColor: '#d4d4d4',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2
    },
    generalInfoContainer: {
        backgroundColor: '#d4d4d4',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 7
    },
    item: {
        width: '95%',
        alignSelf: 'center',
        margin: 10,
        padding: 20,
        flex: 1,
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { x: 0, y: 10 },
        shadowOpacity: 1,
    },

})
