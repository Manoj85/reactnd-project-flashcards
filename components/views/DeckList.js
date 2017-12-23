import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { AppLoading} from 'expo'
import { connect } from 'react-redux'
import _ from 'lodash'

import { getDecks, fetchDeckResults } from '../../utils/api'
import { loadDecks} from '../../actions'
import {blue, gray, white} from '../../utils/colors'
import Deck from './Deck'

class DeckList extends Component {
    state = {
        ready: false,
        deckInfo: []
    }

    componentDidMount () {
        fetchDeckResults()
            .then((decks) => this.props.loadDecks(decks))
            .then(({decks}) => {
                this.setState(() => ({
                    ready: true,
                    deckInfo: _.keys(decks).map((key) => {
                        return {
                            deckName: key,
                            deckCardCount: decks[key].questions.length > 0 ? decks[key].questions.length : 0
                        }
                    })
                }))
            })
        ;
    }

    componentWillReceiveProps(nextProps) {
        console.log(`componentWillReceiveProps`)
        const decks = nextProps.decks
        if (decks) {
            this.setState( {
                deckInfo: _.keys(decks).map((key) => {
                    return {
                        deckName: key,
                        deckCardCount: decks[key].questions.length > 0 ? decks[key].questions.length : 0
                    }
                })
            })
        }
    }

    render() {
        const { decks } = this.props
        const { ready, deckInfo } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={deckInfo}
                    keyExtractor={(item, index) => item.deckName}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.deck} key={item.deckName}
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
