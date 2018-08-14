import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  NetInfo,
  Alert
 } from 'react-native';
import styles from './styles';

export default class NetworkTest extends Component {

  state = {
      connectionType: "none"
  }

  componentDidMount() {


    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
      this.setState({
        connectionType: connectionInfo.type
      });
    });


    NetInfo.addEventListener(
      'connectionChange',
      this.handleConnectivityChange
    );

  }

  handleConnectivityChange = (connectionInfo) => {
    console.log('Connection change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    this.setState({
      connectionType: connectionInfo.type
    });
  }

  render() {
    let { networkStatus, connectionType } = this.state;
    return (
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
      <Text>Connection type: { connectionType }</Text>
    </ScrollView>
    )
  }
}
