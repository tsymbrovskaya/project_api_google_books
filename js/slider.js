const slides = [
    {
        img:'images/banner_1.png'
    },

    {
        img: 'images/banner_2.png'
    },

    {
        img: 'images/banner_3.png'
    },
]

let activeSlide = 0
let activeTimeOut = null

function displayNav() {
    const navBar = document.querySelector(".slider-navigation")
    console.log(navBar)
    slides.forEach(function (slide, index){
        navBar.innerHTML += `<div class="dot" onclick="window.displaySlide(${index})" ></div>`
    })
}

export function displaySlide(index){
    const slide = slides[index]
    const slideImage = slide.img
    const img = document.querySelector('.slider .slider-item')
    img.src = slideImage

    const dots = document.querySelectorAll('.dot')

    dots.forEach(function (dot){
        dot.classList.remove("active")
    })

    const dot = dots[index]
    dot.classList.add("active")
    activeSlide = index

    if(activeTimeOut != null){
        clearTimeout(activeTimeOut)
    }

    activeTimeOut = setTimeout(nextSlide, 5000)

}

function nextSlide(){
    let nextSlide = activeSlide + 1
    if (nextSlide > slides.length - 1){
        displaySlide(0)
    } else {
        displaySlide(nextSlide)
    }
}

export function main() {
    displayNav()
    displaySlide(0)
}
