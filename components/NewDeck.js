import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { purple, blue, gray } from '../utils/colors'

class NewDeck extends Component {
    state = {
        deskName: ''
    }

    handleInput = (text) => {
        this.setState({ deskName: text })
    }

    handleSubmit = (text) => {
        console.log(`Submitting .. ${this.state.deskName}`)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.newDeckText}>Enter Deck Name</Text>
                <TextInput style= {styles.input}
                           underlineColorAndroid="transparent"
                           autoCapitalize="none"
                           onChangeText={this.handleInput}
                           onSubmitEditing={this.handleSubmit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    newDeckText: {
        color: blue,
        fontSize: 20
    },
    input: {
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        marginTop: 10
    }
})

export default NewDeck