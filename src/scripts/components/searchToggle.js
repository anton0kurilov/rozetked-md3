const searchToggleElement = document.querySelector('[data-search-toggle]'),
    searchInputElement = document.querySelector('.header__search-input'),
    searchFormElement = document.querySelector('.header__search')

searchToggleElement.addEventListener('click', function () {
    let overlayElement = document.createElement('div')
    overlayElement.classList.add('overlay')
    document.querySelector('body').appendChild(overlayElement)
    searchInputElement.classList.add('active')
    searchInputElement.focus()
    let overlayAddedElement = document.querySelector('.overlay')
    overlayAddedElement.addEventListener('click', function () {
        overlayAddedElement.remove()
        searchInputElement.classList.remove('active')
    })
})

searchFormElement.addEventListener('submit', function () {
    const searchElement = document.querySelector('#search')
    if (searchElement.value == '') {
    } else {
        url = 'https://rozetked.me/search?q=' + searchElement.value
        window.open(url, '')
    }
})
