import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import GreenBtn from './GreenBtn'
import RedBtn from './/RedBtn'
import { red, white, black } from '../utils/colors'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'


class StartQuiz extends Component {
  static navigationOptions = () => {
    return {
      title: 'Take a Quiz'
    }
  }
  correct = () => {
    this.toHome()
  }

  toHome = () => {
    this.props.navigation.goBack()
  }

  Incorrect = () => {
    this.toHome()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>
          Does React Native Work with Android?
        </Text>
        <Text style={styles.answer}>
          Answer
          </Text>
        <GreenBtn
          onPress={this.correct}
          text="Correct" />
        <RedBtn
          onPress={this.correct}
          text="Incorrect" />
      </View>
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
  question: {
    color: black,
    fontSize: 25
  },
  answer: {
    color: red,
    fontSize: 25,
    textAlign: 'center'
  },
})

export default connect()(StartQuiz)