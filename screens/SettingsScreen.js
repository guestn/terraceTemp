import React from 'react';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch
} from 'react-native';
import { MonoText } from '../components/StyledText';


export default class SettingsScreen extends React.Component {
  // state = {
  //   switchOn: this.props.screenProps.status()
  // }
  static navigationOptions = {
    title: 'Settings',
  };


  render() {
    return (
      <View style={s.container}>
        <View style={s.settingArea}>
          <MonoText>Farenheit</MonoText>
          <Switch
            style={s.settingsSwitch}
            value={this.props.screenProps.switchOn}
            onValueChange={this.props.screenProps.onChangeSwitch}
            tintColor={'red'}/>
          <MonoText>Celcius</MonoText>
        </View>
      </View>
    )
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsSwitch: {
    marginLeft: 10,
    marginRight: 10,
  }
});
