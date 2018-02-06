import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
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
    const { name } = this.state  
    const deck = { title: name }   
    this.props.dispatch(addDeck(deck))   

    this.setState(() => ({ name: '' }))

    this.toHome()   
    saveDeckTitle(deck)

  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={true}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholderTextColor={white}
            placeholder="Deck Title"           
          />
        </View>
        <BlackBtn
          onPress={this.submit}
          text="Submit" />
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

export default connect()(AddDeck)