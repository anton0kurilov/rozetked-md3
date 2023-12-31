const searchToggleElement = document.querySelector('[data-search-toggle]'),
    searchInputElement = document.querySelector('.header__search-input'),
    searchFormElement = document.querySelector('#search-form')

let url = ''

searchToggleElement.addEventListener('click', function () {
    let overlayElement = document.createElement('div')
    overlayElement.classList.add('overlay')
    document.querySelector('body').appendChild(overlayElement)
    searchFormElement.classList.add('active')
    searchInputElement.focus()
    let overlayAddedElement = document.querySelector('.overlay')
    overlayAddedElement.addEventListener('click', function () {
        overlayAddedElement.remove()
        searchFormElement.classList.remove('active')
    })
})

searchFormElement.addEventListener('submit', function (e) {
    e.preventDefault()
    const searchElement = document.querySelector('#search')
    if (searchElement.value == '') {
    } else {
        let url = 'https://rozetked.me/search?q=' + searchElement.value
        window.open(url, '')
    }
})
