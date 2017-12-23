import React, {Component} from 'react'
import {connect} from 'react-redux'
import { View, Text, StyleSheet } from 'react-native';
import {gray} from '../../utils/colors'
import Deck from './Deck'

class DeckDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.deck.deckName
    });

    render() {
        console.log(`DeckDetail`)
        // console.log(JSON.stringify(this.props))

        const { decks } = this.props
        const { deck } = this.props.navigation.state.params

        // console.log(`${JSON.stringify(deck)}`)

        return (
            <View>
                <Deck deck={deck} />
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

function mapStateToProps( {decks}) {
    return { decks }
}

export default connect(mapStateToProps, {})(DeckDetail)