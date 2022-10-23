import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Book } from './book';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular CRUD';
  dataSaved = false;
  bookForm:FormGroup;
  allbooks:Observable<Book[]>;
  bookToUpdate = null;
  constructor(private bookservice: BookService, private formBuilder: FormBuilder){}

  ngOnInit(){
    this.bookForm=this.formBuilder.group({
      name:['',[Validators.required]],
      category:['',[Validators.required]],
      writer:['',[Validators.required]]
    });
    this.getBookInfo();
    console.log(this.getBookInfo.name);
  }

  bookToEdit(bookid:string){
    this.bookservice.getBookbyId(bookid).subscribe(book=>{
      this.bookToUpdate=bookid;
      this.bookForm.controls["name"].setValue(book.name);
      this.bookForm.controls["category"].setValue(book.category);
      this.bookForm.controls["writer"].setValue(book.writer);
    });
  }

  bookToDelete(bookid:string){
    this.bookservice.deleteBooks(bookid).subscribe(book=> {
      this.getBookInfo();
    })
  }
  onFormSubmit(){
    this.dataSaved=false;
    let book = this.bookForm.value;
    this.createBook(book);
    this.bookForm.reset();
  }

  createBook(book:Book){
    if(this.bookToUpdate==null) {
      this.bookservice.createBooks(book).subscribe(
      book=>{
        this.dataSaved=true;
        this.getBookInfo();
        this.bookToUpdate=null;
      }
    );
    } else {
      book.id = this.bookToUpdate;
      this.bookservice.updateBooks(book)
      .subscribe(book=>{
        this.dataSaved=true;
        this.getBookInfo();
        this.bookToUpdate=null;
      })
    }
  }

  getBookInfo(){
    this.allbooks=this.bookservice.getBooks();   
  }
}
