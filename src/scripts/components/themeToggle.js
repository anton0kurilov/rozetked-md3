const themeToggleElement = document.querySelector('[data-theme-toggle]')
let htmlElement = document.querySelector('html')

htmlElement.setAttribute('data-theme', localStorage.getItem('theme'))

themeToggleElement.addEventListener('click', function () {
    if (localStorage.getItem('theme') === 'dark') {
        htmlElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    } else if (localStorage.getItem('theme') === 'light') {
        htmlElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
    } else {
        htmlElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    }
})
