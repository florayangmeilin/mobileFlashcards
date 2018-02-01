import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
import { black, white, pink } from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../actions/index';
import { NavigationActions } from 'react-navigation'
import { submitDeck } from '../utils/api'

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Deck Title',
    };
  }
  submit = () => {

    const { name } = this.state
    const deck = { title: name }  
    this.props.dispatch(addDeck(deck))

    this.setState(() => ({ name: 'Deck Title' }))

    this.toHome()
    submitDeck(deck)

  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          editable={true}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
        />
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: white,
    justifyContent: 'center',
  },
  question: {
    color: black,
    fontSize: 25
  },
  input: {
    fontSize: 25,
    padding: 70,
    color: pink
  }
})

export default connect()(AddDeck)