import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { AppLoading} from 'expo'
import { connect } from 'react-redux'
import _ from 'lodash'

import { getDecks, fetchDeckResults } from '../../utils/api'
import { loadDecks} from '../../actions'
import {blue, gray, white} from "../../utils/colors";

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
                            <View>
                                <Text style={styles.deckTitle}>{item.deckName}</Text>
                                <Text style={styles.deckCardCount}>{item.deckCardCount} cards</Text>
                            </View>
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
    },
    deckTitle: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
        textAlign: 'center'
    },
    deckCardCount: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 13,
        color: '#999',
        fontWeight: '300',
        textAlign: 'center'
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
