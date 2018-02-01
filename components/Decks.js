import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native'
import { fetchDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import DeckDetail from './DeckDetail'

class Decks extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
  }
  render() {
    const { decks, navigation } = this.props
    return (
      <ScrollView>
        {decks && Object.keys(decks).map(deck => (
          <TouchableOpacity
          key={deck}
          onPress={() => this.props.navigation.navigate(
            'DeckDetail',
            { deckId: deck }
          )}
          >
          <View style={styles.item} key={deck}>
            <Text style={styles.Text} key={deck}>{deck}</Text>
          </View>
        </TouchableOpacity>))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  Text: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

function mapStateToProps(state) {
  const decks = state.decks
  return decks
}

export default connect(mapStateToProps)(Decks)
