import React, { useEffect } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar, Dimensions,
} from 'react-native';
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {NavigationContainer} from "@react-navigation/native";
import mainStyles from "./src/Styles";
import * as colors from './src/res/colors.js'
import * as Constants from "./src/Constants.js";
import * as utils from './src/utils.js';
import * as storage from './src/Storage';
import * as Navigation from './src/Navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const App = () => {

    useEffect( () => {
        (async () =>  {
            await storage.initStorage()
        })()

    }, [])

    return (
        <NativeBaseProvider style={{backgroundColor: colors.mainGray}}>
        <NavigationContainer>
                    <Navigation.MainTabNavigator>
                    </Navigation.MainTabNavigator>
        </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default App;