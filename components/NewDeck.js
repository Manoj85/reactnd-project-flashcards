import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AppLoading} from 'expo'

class NewDeck extends Component {
    state = {
        ready: false
    }

    componentDidMount () {
        const { dispatch } = this.props
    }

    render() {
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View>
                <Text>New Deck</Text>
            </View>
        )
    }
}

export default NewDeck