let myLibrary = [{
    title: 'Alfreds Futterkiste',
    author: 'Maria Anders',
    pages: '123',
    read: true
},
{
    title: 'Ambar Futterkiste',
    author: 'Maria Anders',
    pages: '777',
    read: false
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '6626',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '555',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '444',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '333',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '222',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '111',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '5555',
    read: true
}];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${read? 'already read this book' : 'not read yet'}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooksOnPage(library){

    const table = document.querySelector('tbody');

    library.forEach((book, index) => {
        console.log(book);

        const row = document.createElement('tr');
        row.classList.add('book');
        row.dataset.bookPosition = index;

        for(const property in book){
            let cell = document.createElement('td');
            if(property !== 'info'){
                if(property === 'read')
                    book[property] ? cell.innerText = 'Yes' : cell.innerText = 'No';
                else
                    cell.innerText = book[property];

                row.appendChild(cell);
            }
        }

        //Boton de eliminar
        let cell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.addEventListener('click', (e) => {
            console.log(e.target.parentElement.parentElement.dataset.bookPosition);
            myLibrary.splice(e.target.parentElement.parentElement.dataset.bookPosition, 1);
            clearTable();
            displayBooksOnPage(myLibrary);
        });
        deleteButton.innerText = 'X';
        cell.appendChild(deleteButton);
        row.appendChild(cell);

        table.appendChild(row);
    });
}

function handleSubmit(e){
    e.preventDefault();

    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const pagesInput = document.querySelector('#pages');
    const readInput = document.querySelector('#read-it');

    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked ? true : false);

    myLibrary.push(newBook);

    clearTable();

    displayBooksOnPage(myLibrary);

    document.getElementById("form").reset();
    
}

function clearTable(){

    const books = Array.from(document.querySelectorAll('.book'));

    for(let i = 0; i< books.length; i++){
        books[i].remove();
    }

}

displayBooksOnPage(myLibrary);
