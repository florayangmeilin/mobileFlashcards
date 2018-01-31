import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
import { black, white, pink } from '../utils/colors'
import { connect } from 'react-redux'

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
    const deck = this.state

    this.props.dispatch(addEntry({
      [key]: entry
    }))

    this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }))

    this.toHome()

    submitEntry({ key, entry })
   
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}  behavior="padding">
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
  }
})

export default connect(
  mapStateToProps
)(AddDeck)