import React from 'react';

import {
  ScrollView,
} from 'react-native';

import { StockLine } from 'react-native-pathjs-charts';

// import { MonoText } from '../components/StyledText';
const options = {
  width: 1200,
  height: 250,
  color: '#ee3333',
  margin: {
    top: 10,
    left: 25,
    bottom: 30,
    right: 10,
  },
  animate: {
    type: 'delayed',
    duration: 200,
  },
  axisX: {
    showAxis: true,
    showLines: true,
    showLabels: true,
    showTicks: true,
    zeroAxis: false,
    orient: 'bottom',
    tickValues: [],
    labelFunction: ((v) => {
      //let d = moment('2016-10-08 14:00', 'YYYY-MM-DD HH:mm')
      //return d.add((v * 2), 'hours').format('h:mm A')
      return v;
    }),
    label: {
      fontFamily: 'space-mono',
      fontSize: 8,
      fontWeight: true,
      fill: '#ee3333',
    },
  },
  axisY: {
    showAxis: true,
    showLines: true,
    showLabels: true,
    showTicks: true,
    zeroAxis: false,
    orient: 'left',
    tickValues: [],
    label: {
      fontFamily: 'space-mono',
      fontSize: 8,
      fontWeight: true,
      fill: '#ee3333',
    },
  },
};

const Graph = ({ data }) => {
  return (
    <ScrollView horizontal>
      <StockLine data={[data]} options={options} xKey={'time'} yKey={'temp'} />
    </ScrollView>
  );
};

export default Graph;
