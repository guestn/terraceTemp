import React, { Component } from 'react';
import { any } from 'prop-types';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo';

import TempHumidityView from '../components/TempHumidityView';

const { height, width } = Dimensions.get('window');

export default class HomeScreen extends Component {

  static propTypes = {
    screenProps: any,
  }
  static navigationOptions = {
    title: 'Temps',
  };

  constructor(props) {
    super(props);
    this.state = {
      bgHue: 180,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps);
  }

  temp = (value) => {
    const bgHue = (parseInt(value, 0) * 4) + 180;
    console.log(bgHue);
    this.setState({ bgHue });
  }

  render() {
    const { bgHue } = this.state;
    console.log('dim', height, width);
    return (
      <LinearGradient
        colors={[`hsl(${bgHue},100%,50%)`, `hsl(${bgHue},100%,90%)`]}
        style={s.pageContainer}
      >
        <View style={s.welcomeContainer}>
          <Image
            source={require('../assets/images/temp-icon.png')}
            style={s.welcomeImage}
          />
        </View>
        <TempHumidityView
          units={this.props.screenProps.switchOn ? 'celcius' : 'farenheit'}
          temp={this.temp}
        />
      </LinearGradient>
    );
  }
}

const s = StyleSheet.create({
  pageContainer: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 0,
    height,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});
