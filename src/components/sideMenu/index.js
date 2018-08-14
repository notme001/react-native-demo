import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity
 } from 'react-native';
 import { Navigation } from 'react-native-navigation';

 import styles from './styles';

 export default class SideMenu extends Component {

   currentScreen = 'NetworkTest';

   navigate = (nextScreen) => {
     Navigation.push(this.currentScreen, {
       component: {
         name: nextScreen
       }
     })
     this.currentScreen = nextScreen;
   }

   render() {
     return (
       <ScrollView
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideMenuOption}
          onPress={() => this.navigate('NetworkTest')}
        >
          <Text>Network Status Demo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideMenuOption}
          onPress={() => this.navigate('MqttTest')}
        >
          <Text>Mqtt Demo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sideMenuOption}
          onPress={() => this.navigate('RestTest')}
        >
          <Text>REST Demo</Text>
        </TouchableOpacity>

      </ScrollView>
     )
   }
 }
