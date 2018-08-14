/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import MqttTest from './src/components/mqttTest';
import RestTest from './src/components/restTest';
import NetworkTest from './src/components/networkTest';
import SideMenu from './src/components/sideMenu';
import BackgroundFetch from 'react-native-background-fetch';

import { Navigation } from 'react-native-navigation';

Navigation.registerComponent('MqttTest', () => MqttTest);
Navigation.registerComponent('RestTest', () => RestTest);
Navigation.registerComponent('NetworkTest', () => NetworkTest);
Navigation.registerComponent('SideMenu', () => SideMenu);

navigationStack = {
  children: [
    {
      component: { name: 'RestTest', id: 'RestTest' },
    },
    {
      component: { name: 'MqttTest', id: 'MqttTest' },
    },
    {
      component: { name: 'NetworkTest', id: 'NetworkTest' }
    }
  ],
  options: {}
}

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
      topBar: {
      visible: false,
      drawBehind: true,
      animate: false,
    }
  });

  Navigation.setRoot({
  	root: {
    	  sideMenu: {
      		left: {
      		  component: {
      			     name: 'SideMenu',
                 id: 'SideMenu'
      		  }
      		},
          center: {
            stack: navigationStack
          }
    	 }
    }
  });
})


  // Test background fetch
  BackgroundFetch.configure({
    minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
    stopOnTerminate: false,   // <-- Android-only,
    startOnBoot: true         // <-- Android-only
  }, () => {
    console.log("[js] Received background-fetch event");
    // Required: Signal completion of your task to native code
    // If you fail to do this, the OS can terminate your app
    // or assign battery-blame for consuming too much background-time
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
  }, (error) => {
    console.log("[js] RNBackgroundFetch failed to start");
  });

  // Optional: Query the authorization status.
  BackgroundFetch.status((status) => {
    switch(status) {
      case BackgroundFetch.STATUS_RESTRICTED:
        console.log("BackgroundFetch restricted");
        break;
      case BackgroundFetch.STATUS_DENIED:
        console.log("BackgroundFetch denied");
        break;
      case BackgroundFetch.STATUS_AVAILABLE:
        console.log("BackgroundFetch is enabled");
        break;
    }
  });

  BackgroundFetch.start();


export default class App extends Component { };
