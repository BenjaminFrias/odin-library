const libraryTable = document.querySelector(".library-table tbody");

const myLibrary = [];

function Book(title, author, pages, read) {
    (this.title = title),
        (this.author = author),
        (this.pages = pages),
        (this.read = read),
        (this.info = function () {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
        });
}

function addBookToLibrary() {
    let title = prompt("Book title: ");
    let author = prompt("Book author: ");
    let pages = prompt("Book pages: ");
    let read = confirm("read the book?");

    myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
    myLibrary.forEach((book) => {
        const tr = document.createElement("tr");
        for (let prop in book) {

            // Check if the property is a method
            if (book.hasOwnProperty(prop) && typeof book[prop] !== "function") {
                const bookData = document.createElement("td");
                bookData.textContent = book[prop];
                tr.appendChild(bookData);
            }
        }

        libraryTable.appendChild(tr);
    });
}

displayBooks();
