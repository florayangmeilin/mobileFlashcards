import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ErrorDeck = () => {
  <View style={styles.center}>
    <Ionicons
      name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
      size={100}
    />
    <Text>The name of your deck is either empty or repeated.</Text>
    <TextButton style={{ padding: 10 }} onPress={this.reset}>
      Go Back
    </TextButton>
  </View>
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})

export default ErroDeck