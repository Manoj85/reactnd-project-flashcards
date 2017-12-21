import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AppLoading} from 'expo'
import { connect } from 'react-redux'
import _ from 'lodash'

import { getDecks } from '../../utils/api'
import { loadDecks } from '../../actions'

class DeckList extends Component {
    state = {
        ready: false,
        decks: []
    }

    componentDidMount () {
        const { dispatch } = this.props
        getDecks()
            .then(data => dispatch(loadDecks(data)))
            .then(({ decks }) => this.setState({ready: true, decks: _.keys(decks)}))
    }

    componentWillReceiveProps(nextProps) {
        const decks = nextProps.decks
        if (decks) {
            this.setState({ decks: _.keys(decks) });
        }
    }

    render() {
        const { decks, ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View style={{flex: 1}}>
                <Text>Deck List</Text>
            </View>
        )
    }
}

function mapStateToProps ({decks}) {
    return {
        decks
    }
}


export default connect(
    mapStateToProps
)(DeckList)