const socialsButton = document.querySelector('#aside-socials'),
    socialsElement = document.querySelector('.socials')

if (window.screen.height <= 1000) {
    socialsButton.addEventListener('click', function () {
        socialsElement.classList.toggle('active')

        let overlayElement = document.createElement('div')
        overlayElement.classList.add('overlay')
        document.querySelector('body').appendChild(overlayElement)
        let overlayAddedElement = document.querySelector('.overlay')
        overlayAddedElement.addEventListener('click', function () {
            overlayAddedElement.remove()
            socialsElement.classList.remove('active')
        })
    })
}
