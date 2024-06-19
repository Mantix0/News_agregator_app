import {FlatList, RefreshControl, SafeAreaView, Text, View} from "react-native";
import {Image, Pressable, ScrollView} from "native-base";
import React, {useCallback, useEffect} from "react";
import mainStyles from "./Styles";
import * as colors from './res/colors.js'
import styles from "./Styles";
import * as Components from './Components.js'
import * as Constants from './Constants.js'
import * as Utils from './utils'
import RenderHtml from 'react-native-render-html';
import * as storage from "./Storage";
import {current} from "@reduxjs/toolkit";

const DATA = []

for (let i=0;i<31;i++){
    DATA.push({
        title: `element №${i}`
    });
}



const search = (navigation) => {
    navigation.navigate('Profile',{name:"Maxim"})
    console.log('search')
}


const PopularScreen = ({navigation}) =>{

    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = React.useState([]);

    const fetchData = React.useCallback( async ()=>{

        const max_amount = 10
        const time_period = 7

        try {
            const response = await fetch(Constants.apiUrl+"article_list/popular",{
                method: "POST",
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: `max_amount=${max_amount}&time_period=${time_period}`
            }
                );
            const json = await response.json();
            setData(json.articles);
            console.log('fetched')
        } catch (error) {
            console.error(error);
        }
    },[])

    useEffect(() => {
        fetchData();
    }, []);


    const onRefresh = React.useCallback(() => {
        fetchData()
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return(
    <SafeAreaView style={mainStyles.container}>
        <View style={mainStyles.header}>
            <Components.ButtonGroup
                data={Constants.popularButtonsData}
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
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={data}
            renderItem={({item}) => <Components.Article article={item} navigation={navigation} />}
        />
    </SafeAreaView>)
};

const RecommendedScreen = ({navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
    <SafeAreaView style={mainStyles.container}>
        <View style={mainStyles.header}>
            <Components.ButtonGroup
                data={Constants.recommendedButtonsData}
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
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={DATA}
            renderItem={({item}) => <Components.Article article={item} navigation={navigation} />}
        />
    </SafeAreaView>
)};

const HistoryScreen = ({navigation }) =>{

    const [data, setData] = React.useState([]);

    useEffect( () => {
        (async () =>  {
            const history = await storage.getDataObj("history")
            try{
            setData([...history.reverse()])}
            catch{}
        })()
    })

    return(
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
            data={data}
            renderItem={({item}) => <Components.HistoryEntry article={item} navigation={navigation} />}
        />
    </SafeAreaView>
)};

const ProfileScreen = ({navigation,route }) =>(
    <SafeAreaView style={mainStyles.container}>
        <View style={mainStyles.header}></View>
        <FlatList
            data={Constants.profileData}
            renderItem={({item}) => <Components.ProfileItem title={item.title} navigation={navigation} />}
        />
    </SafeAreaView>
);

const ArticleScreen = ({navigation,route }) => {
    const article = route.params.article
    const date = Utils.getElapsedTime(article.publication_date)
    const [content, setContent] = React.useState('');

    useEffect( () => {
        (async () =>  {

            let history = await storage.getDataObj("history")



            const links = history.map((i)=>(i.article_link))

            if (links.includes(article.article_link) === false){
                await fetch(Constants.apiUrl + "update_views?link=" + String(article.article_link))
                console.log("updated")
            }

            history = await history.filter((ar) => (ar.article_link !== article.article_link ))
            await history.push(article)
            await storage.storeDataObj("history", history)


            const response = await fetch(Constants.apiUrl+"article_content?link="+String(article.article_link))
            const json = await response.json()
            setContent(json)



        })()

    }, [])


    return(

        <SafeAreaView style={mainStyles.container}>
            <View style={mainStyles.header}>
                <Pressable onPress={()=>{search(navigation)}}>
                    <Image
                        source={require(`./icons/Search.png`)}
                        alt={`Поиск`}
                        style={{width:30, height:30, marginRight:10}}
                    /></Pressable>
            </View>
            <ScrollView style={{backgroundColor:colors.mainBlack,marginHorizontal:10,marginVertical:5,flex:1,borderRadius:15}}>
                <Image
                    alt={"preview"}
                    style={mainStyles.articlePreview}
                    source={{
                        uri: article.preview_image,
                    }}
                />
                <View style={{padding:14}}>
                <View style={{flexDirection:"row",marginBottom:8}}>
                    <Image
                        alt={article.source_name}
                        style={mainStyles.sourceLogo}
                        source={{
                            uri: article.source_logo,
                        }}
                    >
                    </Image>
                    <View style={{marginLeft:8, height:35}}>
                        <Text style={{color: colors.mainWhite,fontWeight: '500'}}>{article.source_name}</Text>
                        <Text style={{color: colors.mainWhite,fontWeight: '300',fontSize:10}}>{date}</Text>
                    </View>
                </View>

                <View>
                    <Text style={{color: colors.mainWhite,fontWeight: '600',fontSize: 20}}>{article.title}</Text>
                </View>
                <View style={{marginVertical:8}}>
                    {/*<Text style={{color: colors.mainWhite,fontWeight: '300',fontSize: 14}}>{article.text}</Text>*/}
                    <RenderHtml
                        source={{html:String(content)}}
                        baseStyle={{color:colors.mainWhite}}
                        tagsStyles={{a:{ textDecorationLine:'none', color:colors.mainBlue } }}
                        contentWidth={200}
                        ignoredDomTags={["svg", "source", "lite-youtube", "iframe", "button"]}
                    />
                </View>
                <View style={{marginBottom:20}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={article.tag_list}
                        horizontal={true}
                        scrollEnabled={false}
                        renderItem={({item}) => <View style={mainStyles.tagContainer}><Text style={{color: colors.mainWhite,fontWeight:'300',fontSize:14}}>{item}</Text></View>}
                    />
                </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const PreferencesScreen = ({navigation,route }) =>{

    const [tags, setTags] = React.useState({});

    useEffect( () => {
        (async () =>  {
            await storage.initStorage()
            const res = await storage.getDataObj("tags")
            setTags(res)
        })()

    }, [])

    const title = route.params.title
    return(
    <SafeAreaView style={mainStyles.container}>
        <View style={mainStyles.header}></View>
        <FlatList
            contentContainerStyle={{marginTop:10}}
            style={{}}
            horizontal={true}
            data={Object.keys(tags)}
            scrollEnabled={false}
            renderItem={({item}) =>
                <Pressable onPress={()=>{
                    if (tags[item]==="neutral"){
                        setTags((tags)=>{tags[item]="preferred";return {...tags}})
                        }
                    else if (tags[item]==="preferred")
                        setTags((tags)=>{tags[item]="banned";return {...tags}})
                    else
                        setTags((tags)=>{tags[item]="neutral";return {...tags}})

                    storage.storeDataObj("tags",tags)

                }}>
                    <View style={[
                        {
                            backgroundColor: tags[item] === "neutral" ? colors.mainWhite : tags[item] === "preferred" ? colors.mainBlue : colors.red,
                        },
                        mainStyles.radioButton,
                    ]}>
                        <Text style={{color: tags[item] === "neutral" ? colors.mainBlue : colors.mainWhite }}>{item}</Text>
                    </View>
                </Pressable>}
        />
    </SafeAreaView>
    )
};


export {
    RecommendedScreen,
    PopularScreen,
    HistoryScreen,
    ProfileScreen,
    ArticleScreen,
    PreferencesScreen,
};

