import {Dimensions, StatusBar, StyleSheet} from "react-native";

import * as colors from './res/colors.js'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: colors.mainGray,
    },
    navbar: {
        backgroundColor: colors.mainBlack,
    },
    item: {
        backgroundColor: colors.mainBlack,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,

    },
    title: {
        fontSize: 32,
        color: colors.mainWhite,
    },
    bottomTabIcon:{
        width:windowWidth/4,
        marginTop:10,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    tabBar:{
        backgroundColor: colors.mainBlack,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        height:60,
        borderTopWidth:0
    },
    radioContainer:{
        backgroundColor:colors.mainBlack,
        borderBottomLeftRadius:15,
        height:40
    },
    header:{
        backgroundColor:colors.mainBlack,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        height:40,
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    radioButton:{
        borderRadius:20,
        marginLeft:5,
        paddingHorizontal:4,
        paddingVertical:2,
        height:25,
        alignItems:'center'
    },
    profileItem:{
        backgroundColor: colors.mainBlack,
        padding: 10,
        borderRadius: 15,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    sourceLogo:{
        width: 35,
        height: 35,
        borderRadius: 50,
        borderColor:colors.mainBlue,
        borderWidth:1},

    article: {
        backgroundColor: colors.mainBlack,
        padding: 20,
        borderRadius: 15,
        marginVertical: 5,
    },
    tagContainer:{
        marginRight:6,
        backgroundColor:colors.mainBlue,
        borderRadius:14,
        paddingHorizontal:6,
        paddingVertical:2,
    },
    articlePreview:{
        height:200,
        width:400,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

    },
    articleContainer:{
        backgroundColor: colors.mainBlack,
        borderRadius: 15,
        marginVertical: 5,
        marginHorizontal: 12,
    },
    historyEntryContainer:{
        backgroundColor: colors.mainBlack,
        borderRadius: 15,
        marginVertical: 5,
        marginHorizontal: 12,
    },
    historyEntry:{
        backgroundColor: colors.mainBlack,
        padding: 10,
        borderRadius: 15,
        marginVertical: 0,
    },


});

export default mainStyles;