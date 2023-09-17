const themeToggleElement = document.querySelector('[data-theme-toggle]')

themeToggleElement.addEventListener('click', function () {
    let htmlElement = document.querySelector('html'),
        themeStatus = htmlElement.getAttribute('data-theme')
    if (themeStatus === 'dark') {
        htmlElement.setAttribute('data-theme', 'light')
    } else if (themeStatus === 'light') {
        htmlElement.setAttribute('data-theme', 'dark')
    }
})
