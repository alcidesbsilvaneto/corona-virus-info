import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'

export default class InfoScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                <Text style={{ textAlign: 'center' }} selectable>
                    Este app consome informações da API covid19-br disponibilizada através
                    do repositório https://brasil.io/dataset/covid19. Que tem como fontes as
                    secretarias de saúde estaduais.
                </Text>
                <Text style={{ textAlign: 'center', marginTop: 30 }} selectable>
                    É desenvolvedor e quer contribuir com o app?
                    https://github.com/alcidesbsilvaneto/corona-virus-info
                </Text>
            </SafeAreaView>
        )
    }
}
