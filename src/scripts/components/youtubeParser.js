const parser = require('rss-parser'),
    parserObj = new parser({
        customFields: {
            item: [['yt:videoId', 'videoId']],
        },
    }),
    youtubeTitleElement = document.querySelector('#youtube-title'),
    youtubeLinkElement = document.querySelector('#youtube-link'),
    youtubeImageElement = document.querySelector('#youtube-image'),
    CORS_PROXY = 'https://cors.kurilov.workers.dev/?uri',
    RSS_FEED =
        'https://www.youtube.com/feeds/videos.xml?channel_id=UCDF_NIAEkcAUvzxe1DUzaQA',
    homeElement = document.querySelector('.home')

;(async () => {
    try {
        let feed = await parserObj.parseURL(CORS_PROXY + RSS_FEED),
            elementContent = feed.items[0].title,
            elementLink = feed.items[0].link,
            elementImage = feed.items[0].videoId
        youtubeTitleElement.innerHTML = 'Видео: ' + elementContent
        youtubeLinkElement.setAttribute('href', elementLink)
        youtubeImageElement.innerHTML =
            '<img src="https://i4.ytimg.com/vi/' +
            elementImage +
            '/maxresdefault.jpg" class="socials__youtube-image">'
    } catch (err) {
        console.log(err.name, err.message)
        let errorElement = document.createElement('div')
        errorElement.innerHTML = `<div class="error"><i class="material-symbols-outlined error-icon">error</i><div class="error-text">Ошибка: ${err.message} <br>Попробуйте позже</div></div>`
        homeElement.appendChild(errorElement)
    }
})()
