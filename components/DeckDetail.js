import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import OrangeBtn from './OrangeBtn'
import BlackBtn from './BlackBtn'
import RedBtn from './RedBtn'
import { white, black, gray } from '../utils/colors'
import AddCard from './AddCard'
import StartQuiz from './StartQuiz'
import { deleteDeck } from '../actions/index'
import { removeDeck } from '../utils/api'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
    return {
      title: deckId
    }
  }

  handleDeleteDeck = () => {
    const { deckId } = this.props.navigation.state.params
    removeDeck(deckId).
      then(() => {
        this.props.dispatch(deleteDeck(deckId))
      }).
      then(() => {
        this.props.navigation.navigate('Home', {})
      })
  }
  render() {
    const { deckId } = this.props.navigation.state.params
    const { decks } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>{deckId}</Text>
        <Text style={styles.smallText}>
          {decks[deckId] ? (decks[deckId].cards ? `${decks[deckId].cards.length} cards` : "0 cards") : ''}
        </Text>
        <OrangeBtn
          text="Add Card"
          onPress={() => this.props.navigation.navigate('AddCard', { deckId })}
        />
        <BlackBtn
          text="Start Quiz"
          onPress={decks[deckId] ? (decks[deckId].cards ? () => this.props.navigation.navigate('StartQuiz', { deckId }) : () => { Alert.alert('You need to add card first...') }) : () => { }}
        />
        <RedBtn
          text="Delete Deck"
          onPress={this.handleDeleteDeck}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: white,
    justifyContent: 'space-around',
  },
  bigText: {
    color: black,
    fontSize: 25,
    textAlign: 'center'
  },
  smallText: {
    color: gray,
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 40,
  },
})

function mapStateToProps(state) {
  const decks = state.decks
  return { decks }
}

export default connect(mapStateToProps)(DeckDetail)