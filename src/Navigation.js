import * as Screens from "./Screens";
import React from "react";
import * as Constants from "./Constants";
import {Text, View} from "react-native";
import mainStyles from "./Styles";
import {Image} from "native-base";
import * as colors from "./res/colors";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import { GestureHandlerRootView} from 'react-native-gesture-handler'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

const PopularStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Popular"
                component={Screens.PopularScreen}
                options={{
                    title: 'Популярное',
                    headerShown:false
                }} />
            <Stack.Screen
                name="Article"
                component={Screens.ArticleScreen}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}


const RecommendedStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Popular"
                component={Screens.RecommendedScreen}
                options={{
                    title: 'Популярное',
                    headerShown:false
                }} />
            <Stack.Screen
                name="Article"
                component={Screens.ArticleScreen}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}

const HistoryStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Popular"
                component={Screens.HistoryScreen}
                options={{
                    title: 'Популярное',
                    headerShown:false
                }} />
            <Stack.Screen
                name="Article"
                component={Screens.ArticleScreen}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Popular"
                component={Screens.ProfileScreen}
                options={{
                    title: 'Популярное',
                    headerShown:false
                }} />
            <Stack.Screen
                name="Preferences"
                component={Screens.PreferencesScreen}
                options={{headerShown:false}}
            />
        </Stack.Navigator>

    )
}

const MainTabNavigator = ({route,title}) =>{
    return(
        <View style={{backgroundColor: colors.mainGray,flex:1}}>
            <Tab.Navigator screenOptions={screenOptions} initialRouteName={"PopularStack"}>
                <Tab.Screen
                    name="PopularStack"
                    component={PopularStack}
                    options={{
                        title: 'Популярное',
                    }} />
                <Tab.Screen
                    name="RecommendedStack"
                    component={RecommendedStack}
                    options={{
                        title: 'Рекомендации',}}
                />
                <Tab.Screen
                    name="HistoryStack"
                    component={HistoryStack}
                    options={{
                        title: 'История',}}
                />
                <Tab.Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    options={{
                        title: 'Профиль',}}
                />
            </Tab.Navigator>
        </View>
    )
}

export {
    MainTabNavigator,
    Stack
}

