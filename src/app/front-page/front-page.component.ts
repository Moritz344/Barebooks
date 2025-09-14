import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LeftBarComponent } from '../left-bar/left-bar.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [HeaderComponent,LeftBarComponent,SearchComponent],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css'
})
export class FrontPageComponent {

  leftBarActionTitle = "";

  constructor() {}

  onSearchClick(title: string) {
    this.leftBarActionTitle = title;
  }

}
