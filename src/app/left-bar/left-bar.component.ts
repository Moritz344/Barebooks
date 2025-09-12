import { Component, OnInit} from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-left-bar',
  imports: [],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})
export class LeftBarComponent implements OnInit{

  searchResult: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getPopular().subscribe(result => {
      let data = this.bookService.fetchInformation(result,this.searchResult);
      console.log(data);
    });

  }


}
