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

    params.append("fields","title,author_name,key,cover_edition_key,first_publish_year,language,edition_count")

    const url = `${this.baseUrl}/search.json?q${params.toString()}`;

    return this.http.get(url);

  }

  getImageFromOlid(olid: string) {
    const imageUrl = `https://covers.openlibrary.org/b/olid/${olid}-L.jpg `

    return imageUrl;

  }

  getDescriptionFromOlid(olidWork: string) {
    const url = `https://openlibrary.org${olidWork}.json `
    return this.http.get(url);
  }

  getPopular() {
    const params = new URLSearchParams();

    params.append("has_fulltext","true");
    params.append("limit","10");

    params.append("fields","title,author_name,first_publish_year,edition_count")


    const url = `${this.baseUrl}/search.json?q=the&${params.toString()}`;
    return this.http.get(url);
  }


  fetchInformation(result: any,searchResult: Book[],): Book[] {

      for (let i=0;i<result?.docs.length;i++) {
        let title = result.docs[i]["title"];
        let author = result.docs[i]["author_name"][0];
        let published = result.docs[i]["first_publish_year"];
        let edition_count = result.docs[i]["edition_count"];
        let languages = result.docs[i]["language"];
        let olid = result.docs[i]["cover_edition_key"]
        var workOlid = result.docs[i]["key"];


        const book: Book = {
          title,
          author,
          published,
          languages,
          edition_count,
          olid,
          workOlid,
          description: ""
        };



        this.getDescriptionFromOlid(workOlid).subscribe((descResult: any) => {
          let description = descResult.description;
          if (typeof(description) == "object") {
            book.description = description.value;
          }else {
            book.description = description;
          }
        });
        searchResult.push(book);

      }
        return searchResult;

  }

}
