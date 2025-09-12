import { Component,Input } from '@angular/core';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-search-result',
  imports: [],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  @Input() data: Book[] = [];

  constructor() {
    console.log("data:",this.data);
  }


}
