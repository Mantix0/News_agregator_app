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
        borderBottomRightRadius:15,
        height:40
    },
    radioButton:{
        borderRadius:20,
        marginLeft:5,
        paddingTop:2,
        paddingBottom:2,
        paddingRight:2,
        paddingLeft:2,
        height:25,
        alignItems:'center'
    }
});

export default mainStyles;