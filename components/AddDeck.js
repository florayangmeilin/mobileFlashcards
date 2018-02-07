import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView, Alert } from 'react-native'
import { white, black, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../actions/index'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'
import BlackBtn from './BlackBtn'

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  submit = () => {
    const { name  } = this.state 
    const deck = { title: name }
    saveDeckTitle(deck).
    then(() => this.props.dispatch(addDeck(deck))).
    then(() => {
      this.setState(() => ({ name: '' }))
      this.props.navigation.navigate('DeckDetail', { deckId: name })
    })   
  }
 
  render() {   
    const { name } = this.state
    const { decks } = this.props
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={true}
            onChangeText={(name) => this.setState({ name })}
            value={name}
            placeholderTextColor={white}
            placeholder="Deck Title"
          />
        </View>
        <BlackBtn
          onPress={name ==='' ? () => {Alert.alert('Deck name cannot be empty...' )} : decks[name] && name=== decks[name].title?  () => {Alert.alert('Deck name already exist...' )}: this.submit}
          text="Create Deck" />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
    justifyContent: 'space-around',
  },
  question: {
    color: black,
    fontSize: 25
  },
  input: {
    fontSize: 25,
    padding: 20,
    color: white
  },
  inputContainer: {
    backgroundColor: gray
  }
})

function mapStateToProps(state) {
  const decks = state.decks
  return { decks }
}

export default connect(mapStateToProps)(AddDeck)