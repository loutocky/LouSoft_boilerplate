import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslateServiceLoader implements TranslateLoader {
  translation: Observable<unknown> = of(null);

  lang: string = '';

  constructor(private http: HttpClient) {

  }

  public getCurrentTranslation(): Observable<any> {
    console.debug('Loading current translation ', this.translation);
    if (!this.translation) {
      return this.getTranslation('cs');
    }
    return this.translation;
  }

  /**
   * Gets the translations from the server
   *
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): Observable<any> {
    if (this.lang !== lang) {
      this.lang = lang;
      console.log(`Loading ${lang} translations`);
      this.translation = this.http.get(`/assets/i18n/${lang}.json`).pipe(publishReplay(1), refCount());
    }
    return this.translation;
  }
}
