add();
// Constructor Function to initialise Book Object
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}
// Constructor Function to display Book Object
function Display() {
}
//Add methods to the protottype of the above function
// 1)Add function to add the list of books
    function add() {
    // console.log("Welcome to my UI");
    //fetching books from local storage
    let bookList=localStorage.getItem("bookList");
    if(bookList==null){
        bookObj=[];
    }
    else{
        bookObj=JSON.parse(bookList);
    }
    tableBody = document.getElementById('tableBody');
     bookObj.forEach(function(element,index){

         
    
    let content = `<tr class="myBooks">
                        
                        <td>${index+1}</td>
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                        <td><button type="button" id="${index}" class="btn btn-danger" onclick="deleteBook(this.id)")>Delete</button></td>
                        
                </tr> `;



    tableBody.innerHTML += content;
});

}
// 2)clear function to clear all fields
Display.prototype.clear = function () {
    libraryForm.reset();

}
// 3) validate function to validate all the forms
Display.prototype.validate = function (book) {
    if (book.name.length < 3 || book.author.length < 3) {
        return false

    }
    else {
        return true;
    }

}
Display.prototype.message = function (givenMessage, x) {
    Message = document.getElementById('message');
    Message.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Message : </strong> ${givenMessage}.${x}.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;

    setTimeout(function () {
        Message.innerHTML = '';

    }

        , 3000);
}

// 4)Storing the books in local Storage
Display.prototype.storeBook=function(book){
    let bookList=localStorage.getItem("bookList");
    if(bookList==null){
        bookObj=[];
    }
    else{
        bookObj=JSON.parse(bookList);
    }
    tempBook={};
    tempBook.name=book.name;
    tempBook.author=book.author;
    tempBook.type=book.type;
    bookObj.push(tempBook);
    localStorage.setItem("bookList",JSON.stringify(bookObj));
}

//Add submit eventListener to the form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    
    let bookname = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;

    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
      book = new Book(bookname, author, type);
   display = new Display();
    
    if (display.validate(book)) {
        display.storeBook(book);
        display.clear();
        display.message("Success", "The book has been added");
        e.preventDefault();
        location.reload();
    }
    else {
        display.message("Error", "The book feilds entered are not valid");
    }
    // e.preventDefault();
}
function deleteBook(index){
    let bookList=localStorage.getItem("bookList");
    if(bookList==null){
        bookObj=[];
    }
    else{
        bookObj=JSON.parse(bookList);
    }
    bookObj.splice(index,1);
    localStorage.setItem("bookList",JSON.stringify(bookObj));
    location.reload();



}
let searchTxt=document.getElementById("searchTxt");
searchTxt.addEventListener("input",function(){
    let searchVal=searchTxt.value;
    let myBooks=document.getElementsByClassName("myBooks");
    Array.from(myBooks).forEach(function(element){
        
        let individualBookName= element.querySelectorAll('td')[1].innerText
        if(!(individualBookName.includes(searchVal))){
           
            element.style.display="none";
        }
        
    })

    


})