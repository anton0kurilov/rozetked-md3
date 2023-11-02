const parser = require('rss-parser'),
    moment = require('moment'),
    parserObj = new parser({
        customFields: {
            item: [['turbo:content', 'extendedContent']],
        },
    }),
    CORS_PROXY = 'https://cors.kurilov.workers.dev/?uri',
    RSS_FEED = 'https://rozetked.me/turbo',
    homeElement = document.querySelector('.home')

import 'moment/locale/ru'
;(async () => {
    try {
        let feed = await parserObj.parseURL(CORS_PROXY + RSS_FEED),
            element = document.createElement('div'),
            regex = '<img[^>]+src="([^">]+)"',
            elementContent = '',
            elementMore =
                '<div class="home-more">Остальное — на <a href="https://rozetked.me">официальном сайте Rozetked</a></div>'
        for (let i = 0; i < 10; i++) {
            let item = feed.items[i]

            let itemImage =
                    item.extendedContent.match(regex)[0] +
                    ' class="home__post-image">',
                elementImage = `<figure>${itemImage}</figure>`,
                elementMeta = `<div class="home__post-content-info"><div class="home__post-content-time" title="${
                    item.pubDate
                }">${moment(
                    item.pubDate
                ).fromNow()}</div><div class="home__post-content-type">${
                    item.creator
                }</div>`,
                elementTitle = `<h1 class="home__post-content-title">${item.title}</h1>`

            elementContent += `<a href="${item.link}" target="_blank"><div class="home__post">${elementImage}<div class="home__post-content">${elementMeta}</div>${elementTitle}</div></div></a>`
        }
        element.innerHTML = elementContent + elementMore
        homeElement.appendChild(element)
    } catch (err) {
        console.log(err.name, err.message)
        let errorElement = document.createElement('div')
        errorElement.innerHTML = `<div class="error"><i class="material-symbols-outlined error-icon">error</i><div class="error-text">Ошибка: ${err.message} <br>Попробуйте позже</div></div>`
        homeElement.appendChild(errorElement)
    }
    return isLoaded()
})()

function isLoaded() {
    const loaderElement = document.querySelector('.loading')
    loaderElement.remove()
}
