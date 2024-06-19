const navigationIcons = {
    inactivePopularIcon :{
        source: require(`./icons/Popular.png`),
    },
    inactiveRecommendedIcon :{
        source: require(`./icons/Recommended.png`),
    },
    inactiveHistoryIcon :{
        source: require(`./icons/History.png`),
    },
    inactiveProfileIcon :{
        source: require(`./icons/Profile.png`),
    },
    activePopularIcon :{
        source: require(`./icons/activePopular.png`),
    },
    activeRecommendedIcon :{
        source: require(`./icons/activeRecommended.png`),
    },
    activeHistoryIcon :{
        source: require(`./icons/activeHistory.png`),
    },
    activeProfileIcon :{
        source: require(`./icons/activeProfile.png`),
    },
}

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

const translatedNames = {
    Popular:'Популярное',
    Recommended:'Рекомендации',
    History:'История',
    Profile:'Профиль'
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