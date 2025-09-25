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

  constructor(private http: HttpClient) { }


  search(name: string,page: string,author?: string,filterOptionsGenre?: string[],filterOptionsYears?: string[]) {
    const params = new URLSearchParams();


    if (name !== "") {
      params.append("q",name);
    }else{
      params.append("q","book");
    }

    if (author) {
      params.append("",author);
    }

    params.append("limit","10");

    params.append("fields","title,author_name,key,cover_edition_key,first_publish_year,edition_count")

    if (filterOptionsGenre && filterOptionsGenre.length >= 1) {
      params.append("subject",filterOptionsGenre.join(","));
    }

    if (filterOptionsYears && filterOptionsYears.length >= 1) {
      params.append("first_publish_year",filterOptionsYears.join(","));
    }

    params.append("page",page);

    const url = `${this.baseUrl}/search.json?${params.toString()}`;

    console.log("search",url);
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

    params.append("fields","title,author_name,")

    params.append("limit","10");

    const url = `${this.baseUrl}/search.json?q=${params}`;
    console.log("p",url);
    return this.http.get(url);
  }


  fetchInformation(result: any,searchResult: Book[]): Book[] {


      for (let i=0;i<result?.docs.length;i++) {
        let title = result.docs[i]["title"] || "";
        let author = result.docs[i]["author_name"][0] || "";
        let published = result.docs[i]["first_publish_year"] || "";
        let edition_count = result.docs[i]["edition_count"] || "";
        let olid = result.docs[i]["cover_edition_key"] || "";
        var workOlid = result.docs[i]["key"] || "";


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
