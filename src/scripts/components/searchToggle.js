const searchToggleElement = document.querySelector('[data-search-toggle]'),
    searchInputElement = document.querySelector('.header__search-input')

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
