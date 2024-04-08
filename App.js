import React from 'react';
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
import NavigationIcons from "./index";
import mainStyles from "./src/Styles";
import * as colors from './src/res/colors.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const BottomTabIcon = ({name,focused}) =>{
    const iconName = `${focused?'': 'in'}active${name}Icon`
    const imgSrc = NavigationIcons[iconName]
    const translatedNames = {
        Popular:'Популярное',
        Recommended:'Рекомендации',
        History:'История',
        Profile:'Профиль'
    }
    return(
    <View style={mainStyles.bottomTabIcon}>
        <Image
            {...imgSrc}
            alt={`${name}`}
            style={{width:30, height:30}}
        />
        <Text style={{color: focused ? colors.mainBlue : colors.mainWhite}}>{translatedNames[name]}</Text>
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

const Tab = createBottomTabNavigator();
const App = () => {
    return (
        <NativeBaseProvider style={{backgroundColor: colors.mainGray}}>
        <NavigationContainer>
            <View style={{backgroundColor: colors.mainGray,flex:1}}>
                <Tab.Navigator s screenOptions={screenOptions}>
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
        </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default App;