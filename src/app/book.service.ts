import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookUrl = "/api/books";

  constructor(private http: HttpClient) { }

  getBookbyId(bookid:string){
    return this.http.get<Book>(this.bookUrl+"/"+bookid);
  }

  createBooks(book:Book): Observable<Book> {
    let httpHeaders = new HttpHeaders()
      .set('Content-type', 'application/Json')
    let options = {
      headers: HttpHeaders
    };
    return this.http.post<Book>(this.bookUrl, book);
  }

  updateBooks(book:Book):Observable<number> {
    let httpHeaders = new HttpHeaders()
    .set('Content-type','application/Json')
    let options = {
      headers: HttpHeaders
    };
    return this.http.put<number>(this.bookUrl+"/"+book.id,book);
  }

  deleteBooks(bookid:string):Observable<number> {
    let httpHeaders = new HttpHeaders()
    .set('Content-type', 'application/Json')
    let options = {
      headers: HttpHeaders
    };
    return this.http.delete<number>(this.bookUrl+"/"+bookid)
  }
  bookToEdit(bookid:string){
    return this.http.get<Book>(this.bookUrl+"/"+bookid);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl);
  }
}