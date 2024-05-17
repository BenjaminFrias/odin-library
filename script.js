const libraryContainer = document.querySelector(".library");
const addBookBtn = document.querySelector("#add-book-btn");
const dialog = document.querySelector("dialog");
const addBookForm = document.querySelector("form");

const myLibrary = [];

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    var title = document.getElementById("title-input").value;
    var author = document.getElementById("author-input").value;
    var pages = document.getElementById("pages-input").value;
    // If radio input yes is pressed readYes is bookCardue, else is false.
    var readYes = document.getElementById("read-input-1").checked;

    addBookToLibrary(title, author, pages, readYes);
    displayBooks();
    dialog.close();

    // Clear inputs
    addBookForm.reset();
});

function Book(title, author, pages, read) {
    (this.title = title),
        (this.author = author),
        (this.pages = pages),
        (this.read = read),
        (this.info = function () {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
        });
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
    const booksCards = document.querySelectorAll(".book-card");
    if (booksCards) {
        booksCards.forEach(card => {
            card.remove();
        });
    }

    myLibrary.forEach((book, i) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        for (let prop in book) {
            // Check if the property is a method
            if (book.hasOwnProperty(prop) && typeof book[prop] !== "function") {
                const bookData = document.createElement("p");
                if (prop == "pages") {
                    bookData.textContent = `Pages: ${book[prop]}`;
                } else if (prop == "read") {
                    bookData.textContent = `Read: ${book[prop]}`;
                }
                else {
                    bookData.textContent = book[prop];
                }
                bookCard.appendChild(bookData);
            }
        }

        // Create delete buttons
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            myLibrary.splice(i, 1);
            displayBooks();
        });
        deleteBtn.textContent = "Delete";
        bookCard.appendChild(deleteBtn);
        
        // Create change read status buttons
        const readStatusBtn = document.createElement("button");
        readStatusBtn.classList.add("read-status-btn");
        readStatusBtn.addEventListener("click", () => {
            myLibrary[i].read = myLibrary[i].read ? false : true;
            displayBooks();
        });
        readStatusBtn.textContent = "Read status";
        bookCard.appendChild(readStatusBtn);

        libraryContainer.appendChild(bookCard);
    });
}
