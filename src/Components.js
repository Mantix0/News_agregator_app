import {Image, Pressable} from "native-base";
import {FlatList, Text, View} from "react-native";
import mainStyles from "./Styles";
import * as colors from "./res/colors";
import React, {useEffect} from "react";
import * as storage from "./Storage"
import * as utils from "./utils"
import AsyncStorage from "@react-native-async-storage/async-storage";

const ButtonGroup = ({containerStyle,data,buttonStyle,checked,setChecked}) =>{
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


const Article = ({article,navigation}) => {
    const date =  utils.getElapsedTime(article.publication_date)

    return(
        <Pressable onPress={({})=> {navigation.navigate("Article", {article:article})}}>
            <View style={mainStyles.articleContainer}>
                <Image
                    alt={"preview"}
                    style={mainStyles.articlePreview}
                    source={{
                        uri: article.preview_image,
                    }}
                />
                <View style={mainStyles.article}>
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
                <View style={{marginBottom: 10}}>
                    <Text style={{color: colors.mainWhite,fontWeight: '600',fontSize: 20}}>{article.title}</Text>
                </View>
                <Pressable>
                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={article.tag_list}
                        horizontal={true}
                        scrollEnabled={false}
                        renderItem={({item}) => <View style={mainStyles.tagContainer}><Text style={{color: colors.mainWhite,fontWeight:'300',fontSize:14,}}>{item}</Text></View>}
                    />
                </View>
                </Pressable>
                </View>
            </View>
        </Pressable>
    )};

    const ProfileItem = ({title,navigation}) => {

    return(

    <Pressable onPress={({})=> {navigation.navigate("Preferences", {title:title})}}>
    <View style={mainStyles.profileItem}>
        <Text style={{color:colors.mainWhite,fontSize:20}}>{title}</Text>
    </View>
    </Pressable>
)};


const HistoryEntry  = ({article,navigation}) => {
    const date =  utils.getElapsedTime(article.publication_date)
    return(
        <Pressable onPress={({})=> {navigation.navigate("Article", {article:article})}}>
            <View style={mainStyles.historyEntryContainer}>
                <View style={mainStyles.historyEntry}>
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
                            <Text style={{color: colors.mainWhite,fontWeight: '500',fontSize:14}}>{article.source_name}</Text>
                            <Text style={{color: colors.mainWhite,fontWeight: '300',fontSize:10}}>{date}</Text>
                        </View>
                    </View>
                    <View style={{marginBottom: 0}}>
                        <Text style={{color: colors.mainWhite,fontWeight: '600',fontSize: 18}}>{article.title}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )};


export {
    Article,
    ProfileItem,
    ButtonGroup,
    HistoryEntry
};


