const navigationIcons = {
    inactivePopularStackIcon :{
        source: require(`./icons/Popular.png`),
    },
    inactiveRecommendedStackIcon :{
        source: require(`./icons/Recommended.png`),
    },
    inactiveHistoryStackIcon :{
        source: require(`./icons/History.png`),
    },
    inactiveProfileStackIcon :{
        source: require(`./icons/Profile.png`),
    },
    activePopularStackIcon :{
        source: require(`./icons/activePopular.png`),
    },
    activeRecommendedStackIcon :{
        source: require(`./icons/activeRecommended.png`),
    },
    activeHistoryStackIcon :{
        source: require(`./icons/activeHistory.png`),
    },
    activeProfileStackIcon :{
        source: require(`./icons/activeProfile.png`),
    },
}

const popularButtonsData = [
    {title: 'За день'},
    {title: 'За неделю'},
    {title: 'За месяц'},
]

const recommendedButtonsData = [
    // {title: 'По релевантности'},
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

const translatedNames = {
    PopularStack:'Популярное',
    RecommendedStack:'Рекомендации',
    HistoryStack:'История',
    ProfileStack:'Профиль'
}

const apiUrl = "https://mantix0.pythonanywhere.com/news_aggregator/api/"


export {
    navigationIcons,
    popularButtonsData,
    recommendedButtonsData,
    profileData,
    translatedNames,
    apiUrl,

};