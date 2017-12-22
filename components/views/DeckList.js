import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AppLoading} from 'expo'
import { connect } from 'react-redux'
import _ from 'lodash'

import { getDecks, fetchDeckResults } from '../../utils/api'
import { loadDecks} from '../../actions'

class DeckList extends Component {
    state = {
        ready: false,
        decks: []
    }

    componentDidMount () {
        const { dispatch } = this.props

        fetchDeckResults()
            .then((decks) => this.props.loadDecks(decks))
            .then(({decks}) => {
                console.log(`fetchDeckResults`)
                // console.log({decks})
                this.setState(() => ({ready: true, deckNames: Object.keys(decks) }))
            })
        ;
    }

    componentWillReceiveProps(nextProps) {
        const decks = nextProps.decks
        if (decks) {
            this.setState({ decks: _.keys(decks) });
        }
    }

    render() {
        console.log(`DeckList - render`)
        const { decks } = this.props
        const { deckNames, ready } = this.state
        console.log(`${JSON.stringify(deckNames)}`)

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View style={{flex: 1}}>
                {!!deckNames && (_.map(deckNames, (deskName) => {

                    return (
                        <Text key={deskName}>{deskName}</Text>
                    )
                }))
                }
            </View>
        )
    }
}

function mapStateToProps ({decks}) {
    return {
        decks
    }
}

function mapStateToProps ({ decks }) {
    return { decks }
}

export default connect(mapStateToProps, {loadDecks})(DeckList)
