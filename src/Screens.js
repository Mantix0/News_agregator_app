import {ActivityIndicator, FlatList, RefreshControl, SafeAreaView, Text, View} from "react-native";
import {Image, Pressable, ScrollView} from "native-base";
import React, {useCallback, useEffect, useRef, useState} from "react";
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

    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(Constants.popularButtonsData[0].title);
    const nextPageIdentifierRef = useRef(0)
    const [isLoading, setIsLoading] = useState(true);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true)
    const flatListRef = useRef()



    const fetchData = async ()=>{

        const max_amount = 5
        const time_period = checked === "За день" ? 1 : checked === "За неделю" ? 7 : 30

        setIsLoading(true);

        try {
            const response = await fetch(Constants.apiUrl+"article_list/popular",{
                method: "POST",
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: `time_period=${time_period}&next_page_identifier=${nextPageIdentifierRef.current}`
            }
                );
            const json = await response.json();
            setData((data) =>([...data, ...json.articles]));
            nextPageIdentifierRef.current = json.next_page_identifier
            console.log('fetched',json.articles.length)
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);

    }

    const fetchNextPage = () => {
        if (nextPageIdentifierRef.current == null || isLoading) {
            // End of data.
            return;
        }
        fetchData();
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        nextPageIdentifierRef.current = 0
        setData([])
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);


    useEffect(() => {
        nextPageIdentifierRef.current = 0
        setData([])
        flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 })
        fetchData();
    }, [checked]);




    const ListEndLoader = () => {
        if (nextPageIdentifierRef.current !== 0 && isLoading) {
            // Show loader at the end of list when fetching next page data.
            return <ActivityIndicator size={'large'} />;
        }
    };

    return(
    <SafeAreaView style={mainStyles.container}>
        <View style={mainStyles.header}>
            <Components.ButtonGroup
                data={Constants.popularButtonsData}
                containerStyle = {mainStyles.radioContainer}
                buttonStyle={mainStyles.radioButton}
                checked={checked}
                setChecked={setChecked}
            />
            <Pressable onPress={()=>{search(navigation)}}>
            <Image
                source={require(`./icons/Search.png`)}
                alt={`Поиск`}
                style={{width:30, height:30, marginRight:10}}
            /></Pressable>
        </View>
        <View style={{flex:1, height:this.height}}>
        <FlatList
            ref={flatListRef}
            initialNumToRender={10}
            ListFooterComponent={ListEndLoader}
            onEndReachedThreshold = {0.8}
            onMomentumScrollBegin = {() => {setOnEndReachedCalledDuringMomentum(false)}}
            onEndReached = {() => {
                if (!onEndReachedCalledDuringMomentum) {
                    fetchNextPage()
                    setOnEndReachedCalledDuringMomentum(true);
                }
            }
            }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={data}
            renderItem={({item}) => <Components.Article article={item} navigation={navigation} />}
        />
        </View>
    </SafeAreaView>)
};

const RecommendedScreen = ({navigation }) => {

    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(Constants.recommendedButtonsData[0].title);
    const nextPageIdentifierRef = useRef(0)
    const [isLoading, setIsLoading] = useState(true);
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true)
    const flatListRef = useRef()



    const fetchData = async ()=>{

        const tags = await storage.getDataObj("tags")

        let preferred_tags = []
        let banned_tags = []

        for (const tag in tags) {
            if (tags[tag] === "preferred")
                preferred_tags.push(tag)
            else if (tags[tag] === "banned")
                banned_tags.push(tag)
        }

        try {
            const response = await fetch(Constants.apiUrl+"article_list/recommended",{
                    method: "POST",
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: `next_page_identifier=${nextPageIdentifierRef.current}&preferred_tags=${preferred_tags}&banned_tags=${banned_tags}`
                }
            );
            const json = await response.json();
            setData((data) =>([...data, ...json.articles]));
            nextPageIdentifierRef.current = json.next_page_identifier
            console.log('fetched',json.articles.length)
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);

    }

    const fetchNextPage = () => {
        if (nextPageIdentifierRef.current == null || isLoading) {
            // End of data.
            return;
        }
        fetchData();
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        nextPageIdentifierRef.current = 0
        setData([])
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);


    useEffect(() => {
        nextPageIdentifierRef.current = 0
        setData([])
        flatListRef?.current?.scrollToOffset({ animated: false, offset: 0 })
        fetchData();
    }, [checked]);


    const ListEndLoader = () => {
        if (nextPageIdentifierRef.current !== 0 && isLoading) {
            // Show loader at the end of list when fetching next page data.
            return <ActivityIndicator size={'large'} />;
        }
    };

    return(
        <SafeAreaView style={mainStyles.container}>
            <View style={mainStyles.header}>
                <Components.ButtonGroup
                    data={Constants.recommendedButtonsData}
                    containerStyle = {mainStyles.radioContainer}
                    buttonStyle={mainStyles.radioButton}
                    checked={checked}
                    setChecked={setChecked}
                />
                <Pressable onPress={()=>{search(navigation)}}>
                    <Image
                        source={require(`./icons/Search.png`)}
                        alt={`Поиск`}
                        style={{width:30, height:30, marginRight:10}}
                    /></Pressable>
            </View>
            <View style={{flex:1, height:this.height}}>
                <FlatList
                    ref={flatListRef}
                    initialNumToRender={10}
                    ListFooterComponent={ListEndLoader}
                    onEndReachedThreshold = {0.8}
                    onMomentumScrollBegin = {() => {setOnEndReachedCalledDuringMomentum(false)}}
                    onEndReached = {() => {
                        if (!onEndReachedCalledDuringMomentum) {
                            fetchNextPage()
                            setOnEndReachedCalledDuringMomentum(true);
                        }
                    }
                    }
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    data={data}
                    renderItem={({item}) => <Components.Article article={item} navigation={navigation} />}
                />
            </View>
        </SafeAreaView>)
};

const HistoryScreen = ({navigation }) =>{

    const [data, setData] = useState([]);

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
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(false)
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
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {isLoading && <ActivityIndicator size={"large"} color={colors.mainBlue} style={{marginTop: 20}} />}
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
                    {!isLoading &&
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={article.tag_list}
                        horizontal={true}
                        scrollEnabled={false}
                        renderItem={({item}) => <View style={mainStyles.tagContainer}><Text style={{color: colors.mainWhite,fontWeight:'300',fontSize:14}}>{item}</Text></View>}
                    />}
                </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const PreferencesScreen = ({navigation,route }) =>{

    const [tags, setTags] = useState({});

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

