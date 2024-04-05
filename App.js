import React from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';
import {Button} from "native-base";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const DATA = [
]
for (let i=0;i<31;i++){
    DATA.push({
        id: i.toString(),
        title: `element №${i}`
    });
}


const Item = ({title}) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const RecommendedScreen = ({navigation }) =>(
    <NativeBaseProvider>
    <SafeAreaView style={styles.container}>
        <Button>Кнопка</Button>
        <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
        />
    </SafeAreaView>
    </NativeBaseProvider>
);

const PopularScreen = ({navigation }) =>(
    <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
            <Button>Кнопка</Button>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item title={item.title} />}
            />
        </SafeAreaView>
    </NativeBaseProvider>
);

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
        <Tab.Navigator   screenOptions={{
            headerShown: false,
            tabBarIcon : ({focused}) => (
                <View></View>
            )
        }
        }
        >
            <Tab.Screen
                name="Popular"
                component={PopularScreen }
                options={{
                title: 'Популярое',
            }} />
            <Tab.Screen
                name="Recommended"
                component={RecommendedScreen}
                options={{
                    title: 'Рекомендации',}}
            />
            <Tab.Screen
                name="History"
                component={PopularScreen}
                options={{
                    title: 'История',}}
            />
            <Tab.Screen
                name="Profile"
                component={RecommendedScreen}
                options={{
                    title: 'Профиль',}}
            />
        </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#555555',
    },
    item: {
        backgroundColor: '#161616',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,

    },
    title: {
        fontSize: 32,
        color: '#FFFFFF',
    },
});

export default App;