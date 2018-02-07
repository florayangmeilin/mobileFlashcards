import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import GreenBtn from './GreenBtn'
import RedBtn from './RedBtn'
import { red, white, black } from '../utils/colors'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import BlackBtn from './BlackBtn'
import { saveQuizScore } from '../actions'
import { saveQuiz } from '../utils/api'

class StartQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: 0,
      correctNumber: 0,
      incorrectNumber: 0,
      questionSide: true,
    };
  }

  static navigationOptions = () => {
    return {
      title: 'Quiz'
    }
  }

  incorrect = () => {
    this.setState({ cardNumber: this.state.cardNumber + 1, incorrectNumber: this.state.incorrectNumber + 1 })
  }

  correct = () => {
    this.setState({ cardNumber: this.state.cardNumber + 1, correctNumber: this.state.correctNumber + 1 })
  }

  toggleCardSide = () => {
    this.setState({ questionSide: !this.state.questionSide })
  }

  saveScore =() => {
    const { deckId } = this.props.navigation.state.params
    const { decks } = this.props   
    const quiz = { timestamp:Date.now(),deck:deckId, correct:this.state.correctNumber, incorrect:this.state.incorrectNumber, noOfCard: decks[deckId].cards.length }
    this.props.dispatch(saveQuizScore(quiz))
    this.setState(() => ({ 
      cardNumber: 0,
      correctNumber: 0,
      incorrectNumber: 0,
      questionSide: true, }))
    this.props.navigation.goBack()
    saveQuiz(quiz)
  }

  render() {
    const { deckId } = this.props.navigation.state.params
    const { decks, quiz } = this.props
    const { cardNumber, questionSide, correctNumber } = this.state
    const cardTotalNumber = decks[deckId].cards.length
    const currentCard = decks[deckId].cards[cardNumber]  
    return (
      <View style={styles.container}>
        {cardTotalNumber > cardNumber ?
          <View style={styles.container}>
            <Text>
              {cardNumber + 1}/{cardTotalNumber}
            </Text>
            <Text style={styles.question}>
              {questionSide ? currentCard.question : currentCard.answer}
            </Text>
            <TouchableOpacity onPress={this.toggleCardSide}>
              <Text style={styles.answer}>
                {questionSide ? "Answer" : "Question"}
              </Text>
            </TouchableOpacity>
            <GreenBtn
              onPress={this.correct}
              text="Correct" />
            <RedBtn
              onPress={this.incorrect}
              text="Incorrect" />
          </View> : <View style={styles.container}>
            <Text style={styles.question}>
              Congradulations!
            </Text>
            <Text style={styles.question}>
              You have done your quiz!
              </Text>
              <Text style={styles.answer}>
              Score:{Math.round(correctNumber / cardTotalNumber * 100)}
              </Text>
            <BlackBtn
              text="Save Score"
              onPress={this.saveScore}
            />
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: white,
    justifyContent: 'space-between',
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

function mapStateToProps(state) {
  const decks = state.decks
  return { decks }
}
export default connect(mapStateToProps)(StartQuiz)