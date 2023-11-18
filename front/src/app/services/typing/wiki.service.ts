import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IWikiData } from '../../models/interfaces/typing';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor(private readonly http: HttpClient) {
  }

  test(title: string): void {
    this.http.get('https://en.wikipedia.org/api/rest_v1/page/related/' + title).subscribe({
      next: value => console.log(value)
    });
  }


  getDriftedWikiExtract(title: string, lang: string): Observable<IWikiData> {
    const url: string = 'https://' + lang + '.wikipedia.org/api/rest_v1/page/related/' + title;
    const params = {
      format: 'json'
    };
    const randomIndex: number = 5 + Math.floor(Math.random() * 10);
    return this.http.get(url, { params }).pipe(map((wiki: any) => ({
        title: wiki.pages[randomIndex]?.normalizedtitle,
        extract: this.formatExtract(wiki.pages[randomIndex]?.extract)
      })
    ));
  }

  getRandomWikiExtract(lang: string): Observable<IWikiData> {
    const url: string = 'https://' + lang + '.wikipedia.org/api/rest_v1/page/random/summary';
    const params = {
      format: 'json'
    };
    return this.http.get(url, { params }).pipe(map((wiki: any) => ({
      title: wiki?.title,
      extract: this.formatExtract(wiki?.extract)
    })));
  }

  getWikiExtract(title: string, lang: string): Observable<IWikiData> {
    const url: string = 'https://' + lang + '.wikipedia.org/api/rest_v1/page/summary/' + title;
    const params = {
      format: 'json'
    };
    return this.http.get(url, { params }).pipe(map((wiki: any) => ({
      title: wiki?.title,
      extract: this.formatExtract(wiki?.extract)
    })));
  }


  formatExtract(text: string): string {
    return text.replace(/[^\S\n]/g, ' ').trim();
  }
}

