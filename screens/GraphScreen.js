import React from 'react';
import { object } from 'prop-types';


import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-firebase';

import { MonoText } from '../components/StyledText';
import Graph from '../components/Graph';


class GraphScreen extends React.Component {
  static propTypes = {
    values: object,
  }

  static navigationOptions = {
    title: 'History',
  };

  componentWillReceiveProps(newProps) {
    if (newProps.values !== this.props.values) {
      const obj = newProps.values;

      const values = Object.keys(obj)
        .map(key => obj[key])
        .map(value => ({
          time: new Date(value.coreInfo.last_heard),
          temp: JSON.parse(value.result).temp - 3,
          humidity: JSON.parse(value.result).humidity,
        }),
        );
      this.values = values;
    }
  }

  render() {
    if (this.values) {
      return (
        <View style={s.container}>
          <MonoText>Graph</MonoText>
          <Graph data={this.values} />
        </View>
      );
    }
    return (
      <View style={s.container}>
        <MonoText>Loading data...</MonoText>
      </View>
    );
  }
}

const mapFirebaseToProps = () => ({
  values: 'dataset2',
});

export default connect(mapFirebaseToProps)(GraphScreen);

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
