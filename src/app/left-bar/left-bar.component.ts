import { Component, OnInit,Output, EventEmitter} from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-left-bar',
  imports: [],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css'
})

export class LeftBarComponent implements OnInit{

  @Output() searchOnClick = new EventEmitter<string>();
  searchResult: Book[] = [];
  isLoading = false;

  constructor(private bookService: BookService) {}

  onTitle(title: string) {
    this.searchOnClick.emit(title);
  }

  ngOnInit() {
    this.isLoading = true;
    this.bookService.getPopular().subscribe(result => {
      this.bookService.fetchInformation(result,this.searchResult);
      this.isLoading = false;
    });

  }


}
