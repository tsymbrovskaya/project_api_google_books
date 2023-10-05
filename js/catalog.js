const categories = [
    {
        title: "Architecture",
        url: "subject:Architecture",
    },

    {
        title: "Art & Fashion",
        url: "subject:Art",
    },

    {
        title: "Biography",
        url: "subject: Biography & Autobiography",
    },

    {
        title: "Business",
        url: "subject:Business",
    },

    {
        title: "Crafts & Hobbies",
        url: "subject:Crafts & Hobbies",
    },

    {
        title: "Drama",
        url: "subject:Drama",
    },

    {
        title: "Fiction",
        url: "subject:Fiction",
    },

    {
        title: "Food & Drink",
        url: "subject:Cooking",
    },

    {
        title: "Health & Wellbeing",
        url: "subject:Health & Fitness",
    },

    {
        title: "History & Politics",
        url: "subject:History",
    },

    {
        title: "Humor",
        url: "subject:Humor",
    },

    {
        title: "Poetry",
        url: "subject:Poetry",
    },

    {
        title: "Psychology",
        url: "subject:Psychology",
    },
]

let activeSubject = null
let activeStartIndex = null
let activeMaxResults = null

for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    console.log(`${key}: ${localStorage.getItem(key)}`);
}

const apiKey = "AIzaSyAiuUhLVW-vNRMRAudFm1L6HKCpGgNjvXg"

function displayCategories() {
    const categoriesList = document.querySelector(".catalog-categories ul")
    categories.forEach(function (category, index) {
        categoriesList.innerHTML += `<li onclick="window.fetchCategoryBooks(${index})">${category.title}</li>`
    })
}

function renderBook(book) {

    let description = ""
    if ("description" in book.volumeInfo) {
        description = book.volumeInfo.description
        description = description.substring(0, 80) + "..."
    }

    let rating = ''
    if ("ratingsCount" in book.volumeInfo) {
        rating = book.volumeInfo.ratingsCount + " review"
    }

    let price = ''
    if ("listPrice" in book.saleInfo) {
        price = book.saleInfo.listPrice.amount + ' ₽'
    }

    let bookImage = "images/book1.png"
    if ("imageLinks" in book.volumeInfo) {
        bookImage = book.volumeInfo.imageLinks.thumbnail
    }

    let authors = ""
    if ("authors"in book.volumeInfo) {
        book.volumeInfo.authors.forEach(function (author, index) {
            authors = authors + author
            if (index < book.volumeInfo.authors.length - 1) {
                authors = authors + ", "
            }
        })
    }

    let stars = ""
    if ("averageRating" in book.volumeInfo) {
        for (let i = 0; i < 5; i++) {
            if (i > book.volumeInfo.averageRating) {
                stars = stars + '<img src="images/star_empty.png">'
            } else {
                stars = stars + '<img src="images/star.png">'
            }
        }
    }

    let bookInCart = localStorage.getItem(book.id)
    let buttonClass = ''
    let buttonText = ''


    if(bookInCart == null){
        buttonClass = 'button'
        buttonText = 'buy now'
    } else {
        buttonClass = 'button in-cart'
        buttonText =  'in the cart'

    }

    let bookHtml =
        `<div class="book">
                            <div class="book-image">
                                <img src="${bookImage}">
                            </div>
                            <div class="book-content">
                                <h5 class="book-author">
                                    ${authors}
                                </h5>
                                <h2 class="book-title">
                                   ${book.volumeInfo.title}
                                </h2>
                                <div class="book-rating">
                                    <div class="rating-stars">
                                        ${stars}
                                    </div>
                                    <span class="book-reviews">${rating}</span>
                                </div>
                                <p class="book-description">
                                    ${description}
                                </p>
                                <h3 class="book-price">
                                    ${price}
                                </h3>
                                <a class="${buttonClass}" onclick="window.addToCart(this,'${book.id}')">${buttonText}</a>
                            </div>
                        </div>`
    return bookHtml
}

function fetchBooks(subject, startIndex, maxResults) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${subject}&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`
    console.log(url)

    activeSubject = subject
    activeStartIndex = startIndex
    activeMaxResults = maxResults

    fetch(url).then(function (response) {
        return response.json()
    }).then(function (data) {
        const catalogContent = document.querySelector('.catalog-content')
        console.log(data.items)
        data.items.forEach(function (book, index){
            catalogContent.innerHTML = catalogContent.innerHTML + renderBook(book)
        })
    })

}

export function fetchCategoryBooks(index){
    const categoryList = document.querySelectorAll('.catalog-categories ul li')
    categoryList.forEach(function (categoryLi){
        categoryLi.classList.remove("active")
    })
    const categoryLi = categoryList[index]
    categoryLi.classList.add("active")

    const category = categories[index]
    console.log(category)

    const catalogContent = document.querySelector('.catalog-content')
    catalogContent.innerHTML = ''

    fetchBooks(category.url, 0, 6)
}

export function loadMore (){
    fetchBooks(activeSubject, activeStartIndex +6, activeMaxResults)
}
export function addToCart(button, bookId){
    let bookInCart = localStorage.getItem(bookId)

    if(bookInCart == null){
        localStorage.setItem(bookId, 1)
        button.innerHTML = 'in the cart'
        button.classList.add('in-cart')
    } else {
        localStorage.removeItem(bookId)
        button.innerHTML = 'buy now'
        button.classList.remove('in-cart')
    }
}

export function main(){
    displayCategories()
    fetchCategoryBooks(0)
}
