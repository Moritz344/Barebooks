import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = "https://openlibrary.org";

  constructor(private http: HttpClient) { }


  search(name: string,author?: string) {
    const params = new URLSearchParams();

    if (name) {
      params.append("",name);
    }

    if (author) {
      params.append("",author);
    }

    params.append("limit","10");



    const url = `${this.baseUrl}/search.json?q${params.toString()}`;

    return this.http.get(url);

  }

  getPopular() {
    const params = new URLSearchParams();

    params.append("has_fulltext","true");
    params.append("limit","10");

    const url = `${this.baseUrl}/search.json?q=the&${params.toString()}`;
    console.log(url);

    return this.http.get(url);
  }


  fetchInformation(result: any,searchResult: Book[]): Book[] {
      for (let i=0;i<result?.docs.length;i++) {
        let title = result.docs[i]["title"];
        let author = result.docs[i]["author_name"][0];
        let published = result.docs[i]["first_publish_year"];
        let edition_count = result.docs[i]["edition_count"];
        let languages = result.docs[i]["language"];
        searchResult.push({
          title:title,
          author:author,
          published: published,
          languages: languages,
          edition_count: edition_count
        });
      }

      return searchResult;

  }



}
