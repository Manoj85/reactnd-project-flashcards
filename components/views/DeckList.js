import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { AppLoading} from 'expo'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchDeckResults } from '../../utils/api'
import { loadDecks} from '../../actions'
import {blue, gray, white} from '../../utils/colors'
import Deck from './Deck'

import { setLocalNotification, clearLocalNotification } from '../../utils/helper'

class DeckList extends Component {
    state = {
        ready: false
    }

    componentDidMount () {
        fetchDeckResults()
            .then((decks) => this.props.loadDecks(decks))
            .then(({decks}) => {
                this.setState(() => ({ready: true}))
            })
            .then(() => {
                clearLocalNotification()
                    .then(setLocalNotification)
            })
        ;
    }

    componentWillReceiveProps(nextProps) {
        const decks = nextProps.decks
    }

    render() {
        const { decks } = this.props
        const { ready } = this.state

        /*
            decks_arr --> Array of `Deck` objects
            [
                { "title": "", "questions": [] },
                { "title": "", "questions": [] }
            ]
         */
        const decks_arr = _.keys(decks).map((key) => {
            return decks[key]
        })

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={decks_arr}
                    keyExtractor={(item, index) => item.title}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.deck} key={item.title}
                                          onPress={() => this.props.navigation.navigate('DeckDetail', {deck: item})}>
                            <Deck deck={item} />
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'stretch'
    },
    deck: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: gray,
        borderRadius: 8,
        marginBottom: 10
    }
})

function mapStateToProps ({decks}) {
    return {
        decks: decks
    }
}

export default connect(mapStateToProps, {loadDecks})(DeckList)
