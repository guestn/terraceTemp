import React, { Component } from 'react';
import { func, string } from 'prop-types';
import moment from 'moment-timezone';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MonoText } from '../components/StyledText';

const token = 'd1d253a2a98001d4df65eee7d919e0d9149a2ae7';
const URL = `https://api.spark.io/v1/devices/53ff71066667574808382467/data?access_token=${token}`;

export default class TempHumidityView extends Component {
  static propTypes = {
    units: string,
    temp: func,
  }

  constructor(props) {
    super(props);
    this.state = {
      units: (this.props.units) ? 'celcius' : 'farenheit',
      temp: 3,
      humidity: 0,
      lastHeard: moment(),
      error: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    console.log('fetching');
    this.setState({ loading: true });
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return false;
      })
      .then((responseData) => {
        console.log(responseData);
        const data = JSON.parse(responseData.result);
        this.setState({
          temp: data.temp,
          humidity: data.humidity,
          lastHeard: responseData.coreInfo.last_heard,
          loading: false,
          error: null,
        });
        this.props.temp(this.state.temp);
      })
      .catch((error) => {
        console.log('err', error);
        this.setState({
          error: 'network error',
          loading: false,
        });
      })
  }

  convertCtoF = celcius => (celcius * 9 / 5) + 32;

  displayedTime = (time) => {
    if (moment(time).isBefore(moment())) {
      return moment.tz(time, 'America/Los_Angeles').fromNow();
    }
    return moment.tz(moment(), 'America/Los_Angeles').fromNow();
  }

  render() {
    console.log('tp', this.props);
    const { error, temp, humidity, lastHeard, loading } = this.state;
    const displayedTemp = this.props.units === 'celcius' ? temp - 3 : this.convertCtoF(temp - 3);
    return (
      <View >
        <View style={s.tempContainer}>
          <MonoText style={s.tempText}>{ displayedTemp.toFixed(1) }&#176;</MonoText>
          <MonoText style={s.tempText}>{ parseInt(humidity, 0) }%</MonoText>
          <MonoText >{ this.displayedTime(lastHeard) }</MonoText>

          <ActivityIndicator animating={loading} />

        </View>
        { (error) ? (
          <View style={s.errorView}>
            <MonoText>{ error }</MonoText>
          </View>
        ) : null }
        <View>
          <TouchableOpacity style={s.refreshButton} onPress={this.fetchData}>
            <MonoText>Refresh</MonoText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  tempContainer: {
    alignItems: 'center',
  },
  tempText: {
    fontSize: 60,
    backgroundColor: '#fff',
  },
  errorView: {
    backgroundColor: 'red',
    alignItems: 'center',
  },
  refreshButton: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.2)',
    marginTop: 20,
  },
});
