import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  View
 } from 'react-native';
import styles from './styles';
import { Navigation } from 'react-native-navigation';


let backgroundFetchStarted = false;

export default class RestTest extends Component {

  state = {
    messages: [],
    backgroundTaskScheduled: false
  }

  sendMessage = (messageText = "Test message") => {
    fetch(`https://postman-echo.com/get?data=${messageText}`)
    .then(res => {
      console.log('Message received')
      if (res) {

        let message = {
          data: messageText
        };

        let { messages } = this.state;
        messages.push(message);
        this.setState({ messages: messages });

      }
    })
    .catch(err => {
      console.log('Request failed with error ', err);
    })
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

  render() {

    let { messages, delay } = this.state;

    return (
      <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
      <Text style={styles.pageHeader}>REST test</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={this.clearMessages}
      >
        <Text>Clear messages</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
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
