let myLibrary = [{
    title: 'Alfreds Futterkiste',
    author: 'Maria Anders',
    pages: '123',
    read: true
},
{
    title: 'Ambar Futterkiste',
    author: 'Maria Anders',
    pages: '222',
    read: false
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '123',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '123',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '123',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '123',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '123',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '123',
    read: true
},
{
    title: 'Sota Futterkiste',
    author: 'Maria Anders',
    pages: '123',
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

    library.forEach(book => {
        console.log(book);
        const row = document.createElement('tr');

        for(const property in book){
            let cell = document.createElement('td');

            if(property === 'read')
                book[property] ? cell.innerText = 'Yes' : cell.innerText = 'No';
            else
                cell.innerText = book[property];

            row.appendChild(cell);
        }
        table.appendChild(row);
    });
}

function handleSubmit(e){
    e.preventDefault();
    console.log('funca');
}

displayBooksOnPage(myLibrary);
