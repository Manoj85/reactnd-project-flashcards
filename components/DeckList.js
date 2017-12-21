import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AppLoading} from 'expo'
import { connect } from 'react-redux'

class DeckList extends Component {
    state = {
        ready: false
    }

    componentDidMount () {
        const { dispatch } = this.props
    }

    render() {
        const { decks } = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <View>
                <Text>Deck List</Text>
            </View>
        )
    }
}

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(
    mapStateToProps
)(DeckList)