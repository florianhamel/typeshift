import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor(private readonly http: HttpClient) {
  }

  getWikiExtract(keyword: string): Observable<string> {
    const url: string = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + keyword;
    const params = {
      format: 'json'
    };
    return this.http.get(url, { params })
      .pipe(map((wiki: any) => this.formatExtract(wiki.extract)));
  }

  private formatExtract(text: string): string {
    return text.replace(/\s/g, ' ').trim();
  }
}
