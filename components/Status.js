import React from 'react';
import { View, Text, StatusBar, StyleSheet, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const statusHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class Status extends React.Component {
  state = {
    info: null, // stores connection type
  };

  componentDidMount() {
    NetInfo.fetch().then((state) => {
      this.setState({ info: state.isConnected ? state.type : 'none' });
    });

    this.unsubscribe = NetInfo.addEventListener((state) => {
      this.setState({ info: state.isConnected ? state.type : 'none' });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const { info } = this.state;
    const isConnected = info !== 'none';
    const backgroundColor = isConnected ? 'white' : 'red';

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={backgroundColor}
          barStyle={isConnected ? 'dark-content' : 'light-content'}
          animated={false}
        />
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    height: statusHeight + 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});