import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = "https://openlibrary.org";
  email = "moritzmaier353@gmail.com";

  constructor(private http: HttpClient) { }


  search(name: string,page: string,author?: string) {
    const params = new URLSearchParams();
    

    if (name) {
      params.append("",name);
    }

    if (author) {
      params.append("",author);
    }

    params.append("limit","10");

    params.append("fields","title,author_name,key,cover_edition_key,first_publish_year,language,edition_count")

    params.append("page",page);

    const url = `${this.baseUrl}/search.json?q${params.toString()}`;

    console.log(url);
    return this.http.get(url );

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
    console.log(url);
    return this.http.get(url);
  }


  fetchInformation(result: any,searchResult: Book[]): Book[] {

      for (let i=0;i<result?.docs.length;i++) {
        let title = result.docs[i]["title"];
        let author = result.docs[i]["author_name"][0];
        let published = result.docs[i]["first_publish_year"];
        let edition_count = result.docs[i]["edition_count"];
        let olid = result.docs[i]["cover_edition_key"]
        var workOlid = result.docs[i]["key"];


        const book: Book = {
          title,
          author,
          published,
          edition_count,
          olid,
          workOlid,
          description: ""
        };



        if (workOlid !== undefined) {
           this.getDescriptionFromOlid(workOlid).subscribe((descResult: any) => {
             let description = descResult.description;
             if (typeof(description) == "object") {
               book.description = description.value;
             }else {
               book.description = description;
             }
           });

      }else{
        console.error("work olid ist undefined",workOlid);
      }
      searchResult.push(book);

        }
        return searchResult;

  }

}
