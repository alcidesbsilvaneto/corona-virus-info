import React, { useEffect } from 'react'
import { Text, View, SafeAreaView, Platform, StyleSheet, Image, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import SplashScreen from 'react-native-splash-screen'

function checkPermissions() {

    if (Platform.OS === 'ios') {
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            .then(result => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        alert(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        Alert.alert(
                            'Olá',
                            'Para que o app funcione corretamente, precisamos de permissão para acessar a localização do seu dispositivo',
                            [
                                {
                                    text: 'OK', onPress: () => request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
                                        if (result === 'denied') return checkPermissions();
                                        alert('BORA')
                                    })
                                },
                            ],
                            { cancelable: false }
                        )

                        break;
                    case RESULTS.GRANTED:
                        alert('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        alert('Este app não funciona sem acesso a localização, e você bloqueou o acesso. Por favor, re-instale o app, e forneça o acesso a localização');
                        break;
                }
            })
            .catch(error => {
                // …
            });
    } else {
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then(result => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        alert(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        Alert.alert(
                            'Olá',
                            'Para que o app funcione corretamente, precisamos de permissão para acessar a localização do seu dispositivo',
                            [
                                {
                                    text: 'OK', onPress: () => request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
                                        if (result === 'denied') return checkPermissions();
                                        alert('BORA')
                                    })
                                },
                            ],
                            { cancelable: false }
                        )

                        break;
                    case RESULTS.GRANTED:
                        alert('The permission is granted');
                        break;
                    case RESULTS.BLOCKED:
                        alert('Este app não funciona sem acesso a localização, e você bloqueou o acesso. Por favor, re-instale o app, e forneça o acesso a localização');
                        break;
                }
            })
            .catch(error => {
                // …
            });
    }
}

const Splash = () => {
    useEffect(() => {
        checkPermissions();
        SplashScreen.hide();
    }, []);
    return (
        <SafeAreaView style={styles.rootContainer}>
            <View style={{ width: 300, height: 300 }}>
                <Image source={require('../../Assets/Logo.png')} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
            </View>
        </SafeAreaView>
    )
}

export default Splash;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
