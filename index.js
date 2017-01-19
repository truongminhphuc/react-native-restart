/**
 * @providesModule RNRestart
 */

'use strict';

import React, { Component } from 'react';
import { NativeModules, AsyncStorage } from 'react-native';

const { RNRestart } = NativeModules;

class ReactNativeRestart {

    static Restart(restartObject) {
        AsyncStorage.setItem('restartedApp', 'true');
        if (restartObject) {
            AsyncStorage.setItem('restartObject', JSON.stringify(restartObject));
        }
        RNRestart.Restart();
    }

    static async getRestartObject() {
        let value = await AsyncStorage.getItem('restartedApp');
        if (value === 'true') {
            let restartObject = await AsyncStorage.getItem('restartObject');
            if (restartObject) {
                await AsyncStorage.removeItem('restartObject');
                await AsyncStorage.removeItem('restartedApp');
                return JSON.parse(restartObject);
            } else {
                return false;
            }
        } else {
            console.warn('Application was not restarted');
            return false;
        }
    }
}

module.exports = ReactNativeRestart;
