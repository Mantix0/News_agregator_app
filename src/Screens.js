import {FlatList, SafeAreaView, Text, TouchableHighlight, View} from "react-native";
import {Button, Pressable} from "native-base";
import React, {useState} from "react";
import styles from "native-base/src/theme/base/sizes";
import mainStyles from "./Styles";
import * as colors from './res/colors.js'
import {mainWhite} from "./res/colors.js";


const DATA = [
]
for (let i=0;i<31;i++){
    DATA.push({
        title: `element №${i}`
    });
}


const Item = ({title}) => (
    <View style={mainStyles.item}>
        <Text style={mainStyles.title}>{title}</Text>
    </View>
);

const popularButtonsData = [
    {title: 'За день'},
    {title: 'За неделю'},
    {title: 'За месяц'},
]

const recommendedButtonsData = [
    {title: 'По релевантности'},
    {title: 'По рейтингу'},
    {title: 'По времени'},
]


const ButtonGroup = ({containerStyle,data,buttonStyle}) =>{
    const [checked, setChecked] = React.useState(data[0].title);
    return(
        <FlatList
            contentContainerStyle={{alignItems:'center'}}
            style={containerStyle}
            horizontal={true}
            data={data}
            renderItem={({item}) =>
                <Pressable onPress={()=>{setChecked(item.title)}}>
                <View style={[
                    {
                        backgroundColor: checked === item.title ? colors.mainBlue : colors.mainWhite,
                    },
                    buttonStyle,
                ]}>
                <Text style={{color: checked === item.title ? colors.mainWhite: colors.mainBlue }}>{item.title}</Text>
                </View>
            </Pressable>}
        />
    )
}


const PopularScreen = ({navigation }) =>{
    return(
    <SafeAreaView style={mainStyles.container}>
        <ButtonGroup
            data={popularButtonsData}
            containerStyle = {mainStyles.radioContainer}
            buttonStyle={mainStyles.radioButton}/>
        <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
        />
    </SafeAreaView>)
};

const RecommendedScreen = ({navigation }) =>(
    <SafeAreaView style={mainStyles.container}>
        <ButtonGroup
            data={recommendedButtonsData}
            containerStyle = {{backgroundColor:colors.mainBlack, borderBottomLeftRadius:15, borderBottomRightRadius:15, height:40}}
            buttonStyle={{borderRadius:20,marginLeft:5, paddingTop:2, paddingBottom:2, paddingRight:2, paddingLeft:2, height:25, alignItems:'center'}}/>
        <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
        />
    </SafeAreaView>
);

const HistoryScreen = ({navigation }) =>(
    <SafeAreaView style={mainStyles.container}>
        <Button>Кнопка</Button>
        <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
        />
    </SafeAreaView>
);

const ProfileScreen = ({navigation }) =>(
    <SafeAreaView style={mainStyles.container}>
    </SafeAreaView>
);

export {
    RecommendedScreen,
    PopularScreen,
    HistoryScreen,
    ProfileScreen,
};

