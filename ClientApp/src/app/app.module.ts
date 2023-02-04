import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ApiModule } from './api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TranslateServiceLoader } from './shared/translate.loader';

/**
 * Init translation service @ngx-translate
 *
 * @param http
 */
export function TranslateLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateServiceLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    ApiModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    SharedModule,
  ],
  providers: [{
    provide: TranslateLoader,
    useFactory: TranslateLoaderFactory,
    deps: [HttpClient],
  },
],
  bootstrap: [AppComponent],
})
export class AppModule {}
