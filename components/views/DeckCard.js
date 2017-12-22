import React, {Component} from 'react'
import {connect} from 'react-redux'
import { View, Text, StyleSheet } from 'react-native';
import {gray} from "../../utils/colors";

class DeckCard extends Component {

    render() {
        const {deck} = this.props

        console.log(`${JSON.stringify(deck)}`)

        return (
            <View>
                <Text style={styles.deckTitle}>{deck.deckName}</Text>
                <Text style={styles.deckCardCount}>{deck.deckCardCount} cards</Text>
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

function mapStateToProps(state, {}) {
    return {}
}

export default connect(mapStateToProps, {

})(DeckCard)