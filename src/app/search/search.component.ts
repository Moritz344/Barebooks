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
  hidePageBar = false;

  showFilter = false;


  filterOptionsArrayGenre: string[] =
[
    "Fiction",
    "Non-Fiction",
    "Children's and Young Adult Books",
    "Art and Music",
    "Health and Wellness",
    "Travel",
    "Philosophy and Religion",
    "Social Sciences",
    "Nature and Environment",
    "Economics and Finance",
    "Politics",
    "Technology"
];


  filterOptionsArrayYears: string[] = [
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006"
  ];

  selectedFilterOptions: string[] = [];

  selectedFilterOptionsGenres: any = [];
  filterOptionGenre = "";

  selectedFilterOptionsYears: any = [];
  filterOptionYear = "";

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

  this.bookService.search(input,"1","",this.selectedFilterOptionsGenres,this.selectedFilterOptionsYears).subscribe((result: any)  => {
    this.bookService.fetchInformation(result,this.searchResult);
    this.isLoading = false;
    this.resetPaginator();
  });


}

onFilter() {
  this.showFilter = !this.showFilter;

}


addFilterOption(newFilter: string) {
  if (this.filterOptionGenre !== "" && !this.selectedFilterOptionsGenres.includes(this.filterOptionGenre)
     && this.filterOptionsArrayGenre.includes(newFilter)) {
    this.selectedFilterOptionsGenres.push(newFilter);
    this.selectedFilterOptions.push(newFilter);

  }
  if (this.filterOptionYear !== "" && !this.selectedFilterOptionsYears.includes(this.filterOptionYear)
     && this.filterOptionsArrayYears.includes(newFilter) && this.selectedFilterOptionsYears.length < 1 ) {
    this.selectedFilterOptionsYears.push(newFilter);
    this.selectedFilterOptions.push(newFilter);
    console.log(this.selectedFilterOptionsYears);
  }

  }

removeFilter(filter: string) {
  if (this.filterOptionsArrayYears.includes(filter)) {
    const index = this.selectedFilterOptionsYears.indexOf(filter);
    this.selectedFilterOptionsYears.splice(index,1);
  }else if (this.filterOptionsArrayGenre.includes(filter)) {
    const index = this.selectedFilterOptionsGenres.indexOf(filter);
    this.selectedFilterOptionsGenres.splice(index,1);
  }

  const index = this.selectedFilterOptionsYears.indexOf(filter);
  this.selectedFilterOptions.splice(index,1);


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
    this.hidePageBar = true;
    console.log('Page change:', event);
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    const currentPage = Math.floor(this.first / this.rows) + 1;

    this.loadBooks(currentPage.toString());

}



}
