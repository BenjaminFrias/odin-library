const libraryTable = document.querySelector(".library-table tbody");
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
    // If radio input yes is pressed readYes is true, else is false.
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

    // Remove Previous books in table and prevent repetition
    let booksRows = libraryTable.querySelectorAll("tr");
    if (booksRows) {
        booksRows.forEach((row) => {
            row.remove();
        });
    }

    // Add books in table
    myLibrary.forEach((book, i) => {
        const tr = document.createElement("tr");
        for (let prop in book) {
            // Check if the property is a method
            if (book.hasOwnProperty(prop) && typeof book[prop] !== "function") {
                const bookData = document.createElement("td");
                bookData.textContent = book[prop];
                tr.appendChild(bookData);
            }
        }
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            myLibrary.splice(i, 1);
            displayBooks();
        });
        deleteBtn.textContent = "Delete";
        tr.appendChild(deleteBtn);

        libraryTable.appendChild(tr);
    });
}
