import React, { Component } from 'react'
import { KeyboardAvoidingView, TextInput, StyleSheet, View, Alert } from 'react-native'
import BlackBtn from './BlackBtn'
import { white, gray, black } from '../utils/colors'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'


class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: '',
    };
  }
  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }
  submit = () => {   
    const card = this.state
    const { deckId } = this.props.navigation.state.params 
    
    addCardToDeck(deckId,card).
    then(() => {
      this.props.dispatch(addCard(deckId,card))
    }).
    then(() =>{
      this.setState(() => ({ question: '', answer:'' }))
      this.props.navigation.goBack() 
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={true}
            onChangeText={(question) => this.setState({ question })}
            value={this.state.question}
            placeholderTextColor={white}
            placeholder="Your Question"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={true}
            onChangeText={(answer) => this.setState({ answer })}
            value={this.state.answer}
            placeholderTextColor={white}
            placeholder="Your Answer"
          />
        </View>
        <BlackBtn
          onPress={this.state.question===''||this.state.answer==='' ? () => {Alert.alert('Both question and answer cannot be empty...' )} : this.submit}
          text="Submit" />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: white,
    justifyContent: 'space-around',
  },
  input: {
    fontSize: 16,
    padding: 20,
    color: white
  },
  inputContainer: {
    backgroundColor: gray
  }
})

export default connect()(AddCard)