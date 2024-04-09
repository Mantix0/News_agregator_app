import {FlatList, SafeAreaView, Text, TouchableHighlight, View} from "react-native";
import {Button, Image, Pressable} from "native-base";
import React, {useState} from "react";
import styles from "native-base/src/theme/base/sizes";
import mainStyles from "./Styles";
import * as colors from './res/colors.js'


const DATA = [
    {
        title: "Поставки розинчных копий Baldurs's Gate 3 для консолей старнуют в конце апреля",
        tagList: ["Игры","PlayStation 5"],
        sourceName: "StopGame",
        publicationDate: "2024-01-26T13:51:50.417+03:00"
    },
]
for (let i=0;i<31;i++){
    DATA.push({
        title: `element №${i}`
    });
}


const Article = ({title}) => (
    <View style={mainStyles.item}>
        <Text style={mainStyles.title}>{title}</Text>
    </View>
);

const TextArticle = ({item}) => {

    return(
    <View style={{}}>
        <View>
            <Image
            alt={'item.title'}
            >

            </Image>
            <View>
            <Text>{item.sourceName}</Text>
            <Text>{item.publicationDate}</Text>
            </View>
        </View>
        <View>
            <Text>{item.title}</Text>
        </View>
        <View>
            <FlatList
                data={item.tagList}
                renderItem={({item}) => <Text>{item}</Text>}
            />

        </View>
    </View>
)};


const ProfileItem = ({title}) => (
    <View style={mainStyles.profileItem}>
        <Text style={{color:colors.mainWhite,fontSize:20}}>{title}</Text>
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

const profileData = [
    {title: 'Изменить предпочтения'},
    {title: 'Посмотреть лайки'},
    {title: 'Лента по умолчанию'},
    {title: 'Оформление'},
    {title: 'Размер шрифта'},
    {title: 'Настройка истории'},
]

const search = (navigation) => {
    navigation.navigate('Profile',{name:"Maxim"})
    console.log('search')
}


const ButtonGroup = ({containerStyle,data,buttonStyle}) =>{
    const [checked, setChecked] = React.useState(data[0].title);
    return(
        <FlatList
            contentContainerStyle={{alignItems:'center'}}
            style={containerStyle}
            horizontal={true}
            data={data}
            scrollEnabled={false}
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



const PopularScreen = ({navigation}) =>{
    return(
    <SafeAreaView style={mainStyles.container}>
        <View style={mainStyles.header}>
            <ButtonGroup
                data={popularButtonsData}
                containerStyle = {mainStyles.radioContainer}
                buttonStyle={mainStyles.radioButton}/>
            <Pressable onPress={()=>{search(navigation)}}>
            <Image
                source={require(`./icons/Search.png`)}
                alt={`Поиск`}
                style={{width:30, height:30, marginRight:10}}
            /></Pressable>
        </View>
        <FlatList
            data={DATA}
            renderItem={({item}) => <TextArticle item={item} />}
        />
    </SafeAreaView>)
};

const RecommendedScreen = ({navigation }) =>(
    <SafeAreaView style={mainStyles.container}>
        <View style={mainStyles.header}>
            <ButtonGroup
                data={recommendedButtonsData}
                containerStyle = {mainStyles.radioContainer}
                buttonStyle={mainStyles.radioButton}/>
            <Pressable onPress={()=>{search(navigation)}}>
                <Image
                    source={require(`./icons/Search.png`)}
                    alt={`Поиск`}
                    style={{width:30, height:30, marginRight:10}}
                /></Pressable>
        </View>
        <FlatList
            data={DATA}
            renderItem={({item}) => <Article title={item.title} />}
        />
    </SafeAreaView>
);

const HistoryScreen = ({navigation }) =>(
    <SafeAreaView style={mainStyles.container}>
        <View style={mainStyles.header}>
            <Pressable onPress={()=>{search(navigation)}} >
                <Image

                    source={require(`./icons/Search.png`)}
                    alt={`Поиск`}
                    style={{width:30, height:30, marginRight:10}}
                /></Pressable>
        </View>
        <FlatList
            data={DATA}
            renderItem={({item}) => <Article title={item.title} />}
        />
    </SafeAreaView>
);

const ProfileScreen = ({navigation,route }) =>(
    <SafeAreaView style={mainStyles.container}>
        <View style={mainStyles.header}></View>
        <FlatList
            data={profileData}
            renderItem={({item}) => <ProfileItem title={item.title} />}
        />
    </SafeAreaView>
);

export {
    RecommendedScreen,
    PopularScreen,
    HistoryScreen,
    ProfileScreen,
};

