import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { SearchResultComponent } from '../search-result/search-result.component';

// TODO: loading animation circle thing


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchResultComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchInput = "";

  searchResult: Book[] = [];

  constructor(private bookService: BookService) {
  }

  public onSearch(input: string) {
    this.searchResult.length = 0 ;

    this.bookService.search(input).subscribe((result: any)  => {
      this.bookService.fetchInformation(result,this.searchResult);
      console.log(this.searchResult);
    });


  }


}
