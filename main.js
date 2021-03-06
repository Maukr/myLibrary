let myLibrary = [];

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
                if(property === 'read'){
                    const readButton = document.createElement('button');

                    if(book[property]){
                        readButton.innerText = 'Yes';
                        readButton.classList.add('read');
                        
                    }else{
                        readButton.innerText = 'No';
                        readButton.classList.add('unread');
                        
                    }

                    readButton.addEventListener('click', (e)=>{

                        if(e.target.className === "read"){
                            readButton.classList.replace("read", "unread");
                            readButton.innerText = 'No';
                            book.read = false;
                        }else{
                            readButton.classList.replace("unread", "read");
                            readButton.innerText = 'Yes';
                            book.read = true;
                        }
                        //LocalStorage
                        saveLibToLocal();
                    });

                     

                    cell.appendChild(readButton);
                }
                else
                    cell.innerText = book[property];

                row.appendChild(cell);
            }
        }

        //Boton de eliminar
        let cell = document.createElement('td');
        cell.classList.add('col-delete');
        const deleteButton = document.createElement('button');
        deleteButton.addEventListener('click', (e) => {
            console.log(e.target.parentElement.parentElement.dataset.bookPosition);
            myLibrary.splice(e.target.parentElement.parentElement.dataset.bookPosition, 1);
            //LocalStorage
            saveLibToLocal();
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

    //LocalStorage
    saveLibToLocal();

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

function saveLibToLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getLibFromLocal() {
    const libFromLocal = [];
    if (localStorage.length != 0) {
      JSON.parse(localStorage.getItem("myLibrary")).forEach((book) => {
        libFromLocal.push(
          new Book(book.title, book.author, book.pages, book.read, book.id)
        );
      });
      return libFromLocal;
    }
}

if(localStorage.length > 0) {
    console.log('asdas');
    myLibrary = getLibFromLocal();
}

displayBooksOnPage(myLibrary);
