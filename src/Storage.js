import AsyncStorage from "@react-native-async-storage/async-storage";
import {isEmptyObj} from "native-base";


const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('saved')
    } catch (e) {

    }
};

const storeDataObj = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        console.log(`${key} saved`)
    } catch (e) {

    }
};

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // value previously stored
        }
        return value
    } catch (e) {

    }


};

const getDataObj = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {

    }


};

const getAllKeys = async () => {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
        return keys
    } catch(e) {

    }
}

const tagArray = ["Музыка","Спорт"]


const initStorage = async () => {
    const keys = await getAllKeys()
    if (isEmptyObj(keys)) {
        const tags = {}
        for (const tag of tagArray){
            tags[tag] = 'neutral'
        }
        storeDataObj("tags",tags)
        storeDataObj("history",[])
        console.log("Storage initialized")
    }
}



export {
    storeData,
    getData,
    getDataObj,
    storeDataObj,
    getAllKeys,
    initStorage,
};
