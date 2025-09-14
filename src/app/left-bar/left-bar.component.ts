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
  isLoading = false;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.isLoading = true;
    this.bookService.getPopular().subscribe(result => {
      this.bookService.fetchInformation(result,this.searchResult);
      this.isLoading = false;
    });

  }


}
