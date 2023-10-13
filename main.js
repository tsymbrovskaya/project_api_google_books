import {main as catalogMain, loadMore, addToCart, fetchCategoryBooks} from './js/catalog.js'
import {main as sliderMain, displaySlide} from "./js/slider.js";


window.loadMore = loadMore
window.displaySlide = displaySlide
window.addToCart = addToCart
window.fetchCategoryBooks = fetchCategoryBooks

sliderMain()
catalogMain()
