import { Component, Input,SimpleChanges ,OnChanges } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { SearchResultComponent } from '../search-result/search-result.component';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorState } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';

// TODO: filter options for search
// https://openlibrary.org/search.json?subject=fantasy


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchResultComponent,PaginatorModule,ButtonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnChanges {

  @Input() leftBarAction = "";

  searchInput = "";
  searchResult: Book[] = [];
  isLoading = false;
  first = 0;
  rows = 0;
  showNothing = true;

  showFilter = false;

  constructor(private bookService: BookService) {}

   ngOnChanges(changes: SimpleChanges) {
      if (this.leftBarAction) {
        this.onSearch(this.leftBarAction);
      }

      if (this.searchResult.length >= 1) {
        this.showNothing = false;
      } else {
        this.showNothing = true;
      }
  }

  public onSearch(input: string) {
    this.searchResult.length = 0 ;
    this.isLoading = true;

    this.searchInput = input;

    this.bookService.search(input,"1").subscribe((result: any)  => {
      this.bookService.fetchInformation(result,this.searchResult);
      this.isLoading = false;
      this.resetPaginator();
    });


  }

  onFilter() {
    this.showFilter = !this.showFilter;
    this.showNothing = !this.showNothing;
  }

  loadBooks(page: string) {
    this.searchResult.length = 0;
    this.isLoading = true;
    this.bookService.search(this.searchInput,page).subscribe((result: any)  => {
      this.bookService.fetchInformation(result,this.searchResult);
      this.isLoading = false;
    });
  }

  resetPaginator() {
    this.first = 0;
    this.rows = 10;
  }

  onPageChange(event: PaginatorState) {
    console.log('Page change:', event);
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    const currentPage = Math.floor(this.first / this.rows) + 1;

    this.loadBooks(currentPage.toString());

}



}
