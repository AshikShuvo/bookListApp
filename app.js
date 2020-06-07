class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
class Ui{
    static displayBook(){
        
        const books=Store.getBook();  
        books.forEach((book)=>Ui.addBookToList(book));
    }
    static addBookToList(book){
            const list=document.querySelector('#book-list');
            const row=document.createElement('tr');
            row.innerHTML=`
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
            `;
            list.appendChild(row);
    }
    static delete(element){
        if(element.classList.contains('delete')){
            
            element.parentElement.parentElement.remove();
        }
    }
    static showAlert(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form= document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }
    static clearField(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
}
class Store{
    static getBook(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
       const books=Store.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
       const books= store.getBook();
       books.forEach((book,index)=>{
           if(book.isbn===isbn){
               books.splice(index,1);
           }
       });

       localStorage.setItem('books',JSON.stringify(books));

    }
}

document.addEventListener('DOMContentLoaded',Ui.displayBook);
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
    if(title===''||author===''|| isbn===''){
       Ui.showAlert('All fields are required','danger');
    }else{
        const book=new Book(title,author,isbn);
        Store.addBook(book);
        Ui.showAlert('New book is added to the list','success');
        Ui.addBookToList(book);
        Ui.clearField();
    }
   
});

document.querySelector('#book-list').addEventListener('click',(e)=>{
    Ui.delete(e.target);
    Store.removeBook(e.target.parentElement.previousElimentSibling.txtContent);
    Ui.showAlert('A book is removed','danger');
});