import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Alert
} from 'react-native';
import styles from './styles';
import { Navigation } from 'react-native-navigation';

import BackgroundTask from 'react-native-background-task'
import queueFactory from 'react-native-queue';

import MQTT from 'react-native-mqtt';


export default class MqttTest extends Component {

  constructor(props) {
     super(props);
     Navigation.events().bindComponent(this);
   }

  state = {
    messages: []
  }

  componentDidAppear() {
    this.createMqttClient();
  }

  createMqttClient = (callback = null) => {
    let self = this;

    // create mqtt client
    MQTT.createClient({
      uri: 'mqtt://test.mosquitto.org:8883', // test mqtt broker
      tls: true,
      clientId: 'your_client_id'
    }).then(function(client) {

      client.on('closed', function() {

        console.log('mqtt.event.closed');
        // try to reconnect if connection is lost
        // if (self.state.reconnect) {
        //   client.connect();
        // }

      });

      client.on('error', function(msg) {

        console.log('mqtt.event.error', msg);
        // try to reconnect on error
        // if (self.state.reconnect) {
        //   client.connect();
        // }

      });

      client.on('message', function(msg) {

        console.log('mqtt.event.message', msg);
        let messages = self.state.messages;
        messages.push(msg);
        self.setState({ messages: messages })

      });

      client.on('connect', function() {

        console.log('connected');
        client.subscribe('/data', 0);
        self.client = client;

        if (callback) callback();

      });

      // connect
      client.connect();

    }).catch(function(err){
      console.log(err);
    });
  }

  componentDidDisappear() {
    MQTT.removeClient(this.client)
    this.client = null;
  }

  // send test message without delay
  sendMessage = (messageText = 'Test message') => {
    if (this.client) {
      this.client.publish('/data', messageText, 2, false);
    }
  }

  clearMessages = () => {
    this.setState({ messages: [] });
  }


  renderMessage = (el, index) => {
    return (
      <Text style={styles.messageItem}>
        <Text> {++index} </Text>
        <Text> {el.data} </Text>
      </Text>
    )
  }

  handleDelayValueChange = (val) => {
    this.setState({
      delay: parseInt(val, 10)
    })
  }

  render() {

    let { messages } = this.state;

    return (
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
      <Text>Mqtt test</Text>

      <TouchableOpacity
        style={styles.clearMessagesButton}
        onPress={this.clearMessages}
      >
        <Text>Clear messages</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.messageButton}
        onPress={() => this.sendMessage()}
      >
        <Text>Send test message</Text>
      </TouchableOpacity>

      <Text>Messages Received: </Text>

      <View style={styles.messagesContainer}>
        <FlatList
          keyExtractor={(el, i) => `${i}`}
          data={messages}
          extraData={messages.length}
          renderItem={({ item, index }) => this.renderMessage(item, index)}
        />
      </View>

    </ScrollView>
    )
  }
}
