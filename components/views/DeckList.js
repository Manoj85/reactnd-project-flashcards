import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { AppLoading} from 'expo'
import { connect } from 'react-redux'
import _ from 'lodash'

import { getDecks, fetchDeckResults } from '../../utils/api'
import { loadDecks} from '../../actions'
import {blue, gray, white} from '../../utils/colors'
import DeckCard from './DeckCard'

class DeckList extends Component {
    state = {
        ready: false,
        deckInfo: []
    }

    componentDidMount () {
        const { dispatch } = this.props

        fetchDeckResults()
            .then((decks) => this.props.loadDecks(decks))
            .then(({decks}) => {
                this.setState(() => ({
                    ready: true,
                    // deckNames: _.keys(decks)
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
            // this.setState({ deckNames: _.keys(decks) });
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
        // console.log(`DeckList - render`)
        const { decks } = this.props
        const { deckNames, ready, deckInfo } = this.state
        // console.log(`${JSON.stringify(deckInfo)}`)

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={deckInfo}
                    keyExtractor={(item, index) => item.deckName}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.deck} key={item.deckName}>
                            <DeckCard deck={item} />
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

function mapStateToProps ({ decks }) {
    return { decks }
}

export default connect(mapStateToProps, {loadDecks})(DeckList)
