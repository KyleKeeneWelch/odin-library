// Data Structures

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;

    this.info = function() {
        let readText = haveRead ? "have read." : "not read yet";
        return this.title + ", by " + this.author + ", " + this.pages + " pages, " + readText;
    }
}

function Library() {
    this.books = []

    this.createBookFromInput = function() {
        const title = document.getElementById('title').value.replace(/^\s+|\s+$/gm,'')
        const author = document.getElementById('author').value.replace(/^\s+|\s+$/gm,'')
        const pages = document.getElementById('pages').value
        const haveRead = document.getElementById('have-read').checked
        return new Book(title, author, pages, haveRead)
    }

    this.isInLibrary = function(newBook) {
        return this.books.some((book) => book.title === newBook.title)
      }

    this.addToLibrary = function(newBook) {
        if (!this.isInLibrary(newBook))
        {
            this.books.push(newBook)
        }
        else {
            console.log('Book already in library')
        }
    }

    this.removeBook = function(title) {
        this.books = this.books.filter((book) => book.title !== title)
      }
}

library = new Library()


// User Interface

addBookBtn = document.getElementById('btn-add-book')
bookModal = document.getElementById('book-modal')
overlay = document.getElementById('overlay')
bookForm = document.getElementById('book-form')
bookGrid = document.getElementById('book-grid')

title = document.getElementById('title')
author = document.getElementById('author')
pages = document.getElementById('pages')
haveRead = document.getElementById('have-read')

titleError = document.getElementById('title-error')
authorError = document.getElementById('author-error')
pagesError = document.getElementById('pages-error')
haveReadError = document.getElementById('have-read-error')

const createBookCell = (book) => {
    let bookContainer = document.createElement('div')
    let leftDetails = document.createElement('div')
    let rightDetails = document.createElement('div')
    let title = document.createElement('h2')
    let bookDetails = document.createElement('div')
    let author = document.createElement('p')
    let pages = document.createElement('p')
    let haveRead = document.createElement('INPUT')
    let removeBookContainer = document.createElement('div')
    let removeBook = document.createElement('button')

    bookContainer.classList.add('book-container')
    leftDetails.classList.add('left-details')
    bookDetails.classList.add('book-details')
    rightDetails.classList.add('right-details')
    removeBookContainer.classList.add('btn')

    haveRead.setAttribute("type", "checkbox");

    if (book.haveRead) {
        haveRead.checked = true;
        bookContainer.classList.add('active')
    }

    haveRead.addEventListener("change", (e) => {
        console.log('checkbox triggered')
        if (e.target.checked) {
            bookContainer.classList.add('active')
        }
        else {
            bookContainer.classList.remove('active')
        }
    })

    removeBook.addEventListener("click", (e) => {
        const title = e.target.parentNode.parentNode.parentNode.firstChild.firstChild.innerHTML
        library.removeBook(title)
        updateGrid()
    })

    title.textContent = book.title
    author.textContent = `Author - ${book.author}`
    pages.textContent = `Pages - ${book.pages}`
    removeBook.textContent = 'Remove'

    leftDetails.appendChild(title)
    bookDetails.appendChild(author)
    bookDetails.appendChild(pages)
    leftDetails.appendChild(bookDetails)
    rightDetails.appendChild(haveRead)
    removeBookContainer.appendChild(removeBook)
    rightDetails.appendChild(removeBookContainer)
    bookContainer.appendChild(leftDetails)
    bookContainer.appendChild(rightDetails)
    bookGrid.appendChild(bookContainer)
}

const resetBookGrid = () => {
    bookGrid.innerHTML = ''
}

const updateGrid = () => {
    resetBookGrid()
    if (library.books.length === 0) {
        noBooksText = document.createElement('h3')
        noBooksText.textContent = 'No Books Avaliable! Click the "Add Book" button to add a book!'
        bookGrid.appendChild(noBooksText)
    } else {
        for (let book of library.books) {
            createBookCell(book)
        }
    }
}

const handleKeyboardInput = (e) => {
    if (e.key === 'Escape') closeBookModal()
}

const addBook = () => {
    const newBook = library.createBookFromInput()

    if (library.isInLibrary(newBook)) {
        titleError.textContent = 'This book already exists in your library'
        titleError.classList.add('active')
        return
    }

    library.addToLibrary(newBook)
    updateGrid()
    closeBookModal()
    titleError.textContent = ''
    titleError.classList.remove('active')
}

const closeBookModal = () => {
    bookForm.reset()
    bookModal.classList.remove('active')
    overlay.classList.remove('active')
    titleError.textContent = ''
    titleError.classList.remove('active')
    authorError.textContent = ''
    authorError.classList.remove('active')
    authorError.textContent = ''
    pagesError.classList.remove('active')
    haveReadError.textContent = ''
    haveReadError.classList.remove('active')
    title.style.border = '2px solid var(--color-main)'
    author.style.border = '2px solid var(--color-main)'
    pages.style.border = '2px solid var(--color-main)'
}

const openBookModal = () => {
    bookForm.reset()
    bookModal.classList.add('active')
    overlay.classList.add('active')
}

addBookBtn.onclick = openBookModal
overlay.onclick = closeBookModal
window.onkeydown = handleKeyboardInput

// Form Validation

title.addEventListener("input", (e) => {
    if (title.validity.tooShort) {
        titleError.textContent = "Title needs to have at least 3 characters";
        titleError.classList.add('active')
        title.style.border = '2px solid var(--error-color)'
    }
    else if(title.validity.valueMissing) {
        titleError.textContent = "Title is required";
        titleError.classList.add('active')
        title.style.border = '2px solid var(--error-color)'
    }
    else if (title.checkValidity()) {
        titleError.textContent = '';
        titleError.classList.remove('active')
        title.style.border = '2px solid var(--valid-color)'
    }
});

author.addEventListener("input", (e) => {
    if (author.validity.tooShort) {
        authorError.textContent = "Author needs to have at least 3 characters";
        authorError.classList.add('active')
        author.style.border = '2px solid var(--error-color)'
    }
    else if(author.validity.valueMissing) {
        authorError.textContent = "Author is required";
        authorError.classList.add('active')
        author.style.border = '2px solid var(--error-color)'
    }
    else if (author.checkValidity()) {
        authorError.textContent = '';
        authorError.classList.remove('active')
        author.style.border = '2px solid var(--valid-color)'
    }
});

pages.addEventListener("input", (e) => {
    if (pages.validity.rangeUnderflow) {
        pagesError.textContent = "Pages needs to be a minimum of 10";
        pagesError.classList.add('active')
        pages.style.border = '2px solid var(--error-color)'
    }
    else if(pages.validity.rangeOverflow) {
        pagesError.textContent = "Pages needs to be a maximum of 10000";
        pagesError.classList.add('active')
        pages.style.border = '2px solid var(--error-color)'
    }
    else if(pages.validity.valueMissing) {
        pagesError.textContent = "Pages is required";
        pagesError.classList.add('active')
        pages.style.border = '2px solid var(--error-color)'
    }
    else if (pages.checkValidity()) {
        pagesError.textContent = '';
        pagesError.classList.remove('active')
        pages.style.border = '2px solid var(--valid-color)'
    }
});

bookForm.addEventListener("submit", (e) => {
    if(title.validity.valueMissing) {
        titleError.textContent = "Title is required";
        titleError.classList.add('active')
        title.style.border = '2px solid var(--error-color)'
    }

    if(author.validity.valueMissing) {
        authorError.textContent = "Author is required";
        authorError.classList.add('active')
        author.style.border = '2px solid var(--error-color)'
    }

    if(pages.validity.valueMissing) {
        pagesError.textContent = "Pages is required";
        pagesError.classList.add('active')
        pages.style.border = '2px solid var(--error-color)'
    }

    if (bookForm.checkValidity()) {
        e.preventDefault()
        addBook()
    }
    else {
        e.preventDefault();
    }
})