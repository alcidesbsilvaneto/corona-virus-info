import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import Axios from 'axios';

const Home = ({ navigation }) => {
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [loadingStateVirusInfo, setLoadingStateVirusInfo] = useState(true)
    const [loadingGeneralVirusInfo, setLoadingGeneralVirusInfo] = useState(true)
    const [generalVirusInfo, setGeneralVirusInfo] = useState([])
    const [cityVirusInfo, setcityVirusInfo] = useState({})
    const [stateVirusInfo, setstateVirusInfo] = useState({})
    const [addressState, setAddressState] = useState('');
    const [addressCity, setaddressCity] = useState('')
    const [noStateData, setNoStateData] = useState(false)
    const [noCityData, setNoCityData] = useState(false)
    useEffect(() => {
        getGeneralVirusInfo();
        Geolocation.getCurrentPosition(info => getAddress(info));
    }, []);

    async function getAddress(location) {
        try {
            let response = await Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyAQrDHysGs4O-uJf2tzCwFE2rb0VQPaups`)
            let results = response.data.results;
            if (results && results[0] && results[0].address_components && results[0].address_components[4]) {
                setAddressState(results[0].address_components[4].short_name);
                setaddressCity(results[0].address_components[3].long_name);
                return getStateVirusInfo(results[0].address_components[4].short_name, results[0].address_components[3].long_name);
            } else {
                setLoadingStateVirusInfo(false);
                setNoStateData(true);
            }
        } catch (error) {
            console.log(error);
            setLoadingLocation(false)
        }
    }

    async function getStateVirusInfo(state, city) {
        setLoadingStateVirusInfo(true);
        try {
            let response = await Axios.get(`https://brasil.io/api/dataset/covid19/caso/data?is_last=True&state=${state}&is_last=True`)
            let stateData = response.data.results.find(x => x.state === state && x.place_type === 'state');
            let cityData = response.data.results.find(x => x.city === city);
            if (!stateData) setNoStateData(true);
            if (!cityData) setNoCityData(true);
            setcityVirusInfo(cityData);
            setstateVirusInfo(stateData)
            setLoadingLocation(false);
            setLoadingStateVirusInfo(false);
        } catch (error) {
            console.log(error);
            alert('Erro ao buscar dados do estado')
            alert(error.message)
            setLoadingLocation(false);
            setLoadingStateVirusInfo(false);
            setNoStateData(true);
        }
    }

    async function getGeneralVirusInfo(page = 1) {
        setLoadingGeneralVirusInfo(true)
        try {
            let response = await Axios.get(`https://brasil.io/api/dataset/covid19/caso/data?is_last=True&place_type=state&is_last=True`)
            setGeneralVirusInfo(response.data.results);
            setLoadingGeneralVirusInfo(false);

        } catch (error) {
            console.log(error);
            setLoadingGeneralVirusInfo(false)
        }
    }

    function goToState(state) {
        return navigation.navigate('StateDetails', { state: state });
    }

    function Item({ data }) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => { goToState(data.state) }}>
                <Text>Estado: {data.state}</Text>
                <Text style={{ marginTop: 5 }}>Casos: <Text style={{ color: 'red', fontWeight: 'bold' }}>{data.confirmed}</Text></Text>
                <Text style={{ marginTop: 5 }}>Mortes: <Text style={{ color: 'red', fontWeight: 'bold' }}>{data.deaths}</Text></Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.rootContainer}>
            <View style={styles.stateInfoContainer}>

                {
                    loadingStateVirusInfo ?
                        <Text>Buscando informações do seu estado</Text>
                        :
                        noStateData ?
                            <Text>Dados não disponiveis para o seu estado ({addressState})</Text>
                            :
                            <View style={styles.item}>
                                <Text>Dados com base na sua localização: </Text>
                                <Text style={{ marginTop: 5 }}>Estado: {addressState}. Casos: <Text style={{ color: 'red', fontWeight: 'bold' }}>{stateVirusInfo.confirmed}</Text>. Mortes: <Text style={{ color: 'red', fontWeight: 'bold' }}>{stateVirusInfo.deaths ? stateVirusInfo.deaths : 0}</Text></Text>
                                {
                                    noCityData ?
                                        <Text>Dados não disponiveis para sua cidade ({addressCity})</Text>
                                        :
                                        <Text style={{ marginTop: 5 }}>Cidade: {addressCity}. Casos: <Text style={{ color: 'red', fontWeight: 'bold' }}>{cityVirusInfo.confirmed}</Text>. Mortes: <Text style={{ color: 'red', fontWeight: 'bold' }}>{cityVirusInfo.deaths ? cityVirusInfo.deaths : 0}</Text></Text>
                                }
                            </View>
                }
            </View>
            <View style={styles.generalInfoContainer}>
                {
                    loadingGeneralVirusInfo ?
                        <Text>Buscando informações</Text>
                        :
                        <FlatList
                            refreshing={loadingGeneralVirusInfo}
                            onRefresh={() => { getGeneralVirusInfo(); getStateVirusInfo(addressState, addressCity) }}
                            data={generalVirusInfo}
                            style={{ width: '100%' }}
                            ListHeaderComponent={() => <View style={{ width: '100%', alignItems: 'center' }}><Text>Dados mais recentes dos estados: </Text></View>}
                            contentContainerStyle={{ width: '100%', paddingTop: 20 }}
                            renderItem={({ item }) => <Item data={item} />}
                            keyExtractor={item => item.id}
                        />
                }
            </View>
        </SafeAreaView>
    )
}

export default Home;

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
