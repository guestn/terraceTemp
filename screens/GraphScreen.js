import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import { MonoText } from '../components/StyledText';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'History',
  };

  render() {
    return (
      <View style={s.container}>
        <MonoText>Graph</MonoText>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
