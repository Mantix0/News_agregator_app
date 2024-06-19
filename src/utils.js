import AsyncStorage from "@react-native-async-storage/async-storage";


const getElapsedTime = (startTime) => {
    const result = new Date(Date.now() - Date.parse(startTime))

    if (result.getMonth() >=1)
        return (result.getMonth().toString() + ' месяцев назад')
    if (result.getDate() >=1)
        return (result.getDate().toString() + ' дней назад')
    if (result.getHours() >=1)
        return (result.getHours().toString() + ' часов назад')
    if (result.getMinutes() >=1)
        return (result.getMinutes().toString() + ' минут назад')
    else
        return (result.getSeconds().toString() + ' секунд назад')

}


export {
    getElapsedTime,
};

