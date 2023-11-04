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
            elementBody = `${item.extendedContent}`

            elementContent += `<div class="home__post" id="${i}">${elementImage}<div class="home__post-content">${elementMeta}</div>${elementTitle}</div></div>`
        }
        element.innerHTML = elementContent + elementMore
        homeElement.appendChild(element)

        const postsElements = document.querySelectorAll('.home__post')

        postsElements.forEach(function (element) {
            element.addEventListener('click', function () {
                let link = element.id,
                    post = document.createElement('div'),
                    postAll = `<a href="${feed.items[link].link}" target="_blank"><div class="post__item-read">Прочитать в оригинале</div></a>`,
                    postClose =
                        '<div class="post__item-close" id="post-close"></div>',
                    snippet = document.createElement('div'),
                    desc = document.createElement('p')
                snippet.classList.add('post__item-snippet')
                snippet.innerHTML =
                    'Автор: ' +
                    feed.items[link].creator +
                    ' Дата: ' +
                    moment(feed.items[link].pubDate).format('LLL')
                desc.classList.add('post__item-desc')
                desc.innerHTML = feed.items[link].contentSnippet
                post.classList.add('post__item')
                post.innerHTML =
                    feed.items[link].extendedContent + postAll + postClose

                homeElement.appendChild(post)
                let postHeaderElement =
                        document.querySelector('.post__item header'),
                    postImageElement = document.querySelector(
                        '.post__item header figure'
                    )
                postHeaderElement.appendChild(snippet)

                postHeaderElement.insertBefore(desc, postImageElement)
                let overlayElement = document.createElement('div')
                overlayElement.classList.add('overlay')
                document.querySelector('body').appendChild(overlayElement)

                let overlayAddedElement = document.querySelector('.overlay'),
                    closeButton = document.querySelector('#post-close')
                overlayAddedElement.addEventListener('click', function () {
                    overlayAddedElement.remove()
                    closeButton.remove()
                    post.remove()
                })
                closeButton.addEventListener('click', function () {
                    overlayAddedElement.remove()
                    closeButton.remove()
                    post.remove()
                })
            })
        })
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
