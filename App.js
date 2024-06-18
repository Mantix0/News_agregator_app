import React, { useEffect } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar, Dimensions,
} from 'react-native';
import {Button, Image} from "native-base";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Screens from "./src/Screens"
import mainStyles from "./src/Styles";
import * as colors from './src/res/colors.js'
import * as Constants from "./src/Constants.js";
import * as utils from './src/utils.js';
import * as storage from './src/Storage';
import AsyncStorage from "@react-native-async-storage/async-storage";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const BottomTabIcon = ({name,focused}) =>{
    const iconName = `${focused?'': 'in'}active${name}Icon`
    const imgSrc = Constants.navigationIcons[iconName]
    return(
    <View style={mainStyles.bottomTabIcon}>
        <Image
            {...imgSrc}
            alt={`${name}`}
            style={{width:30, height:30}}
        />
        <Text style={{color: focused ? colors.mainBlue : colors.mainWhite}}>{Constants.translatedNames[name]}</Text>
    </View>
    );
};

const screenOptions = ({route,title}) =>({
    tabBarStyle: mainStyles.tabBar,
    headerShown: false,
    tabBarShowLabel: false,
    tabBarIcon: ({focused}) => (
        <BottomTabIcon name={route.name} focused={focused}/>
    ),
})

const HomeScreen = ({route,title}) =>{
    return(
        <View style={{backgroundColor: colors.mainGray,flex:1}}>
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Popular"
                component={Screens.PopularScreen}
                options={{
                    title: 'Популярное',
                }} />
            <Tab.Screen
                name="Recommended"
                component={Screens.RecommendedScreen}
                options={{
                    title: 'Рекомендации',}}
            />
            <Tab.Screen
                name="History"
                component={Screens.HistoryScreen}
                options={{
                    title: 'История',}}
            />
            <Tab.Screen
                name="Profile"
                component={Screens.ProfileScreen}
                options={{
                    title: 'Профиль',}}
            />
        </Tab.Navigator>
        </View>
    )
}


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const App = () => {

    useEffect( () => {
        (async () =>  {
            await AsyncStorage.clear()
            await storage.initStorage()
        })()

    }, [])

    return (
        <NativeBaseProvider style={{backgroundColor: colors.mainGray}}>
        <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={'Home'} component={HomeScreen} options={{headerShown:false}}/>
                    <Stack.Screen
                        name="Article"
                        component={Screens.ArticleScreen}
                        options={{headerShown:false}}
                    />
                    <Stack.Screen
                        name="Preferences"
                        component={Screens.PreferencesScreen}
                        options={{headerShown:false}}
                    />
                </Stack.Navigator>
        </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default App;