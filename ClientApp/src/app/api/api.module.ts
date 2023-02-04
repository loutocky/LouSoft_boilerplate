import { HttpClient } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import {
  ApiModule as ConfigApiModule,
  BASE_PATH as BASE_PATH_CONFIG,
  Configuration as ConfigConfig,
} from '../../client-shared';

export function basePathFactory(): string {
  const baseUrl = document
    .getElementsByTagName('base')[0]
    .href.replace(/\/$/, '');
  return baseUrl;
}

export function configFactory(): ConfigConfig {
  return new ConfigConfig({ apiKeys: {} });
}

@NgModule({
  imports: [ConfigApiModule],
  declarations: [],
  exports: [ConfigApiModule],
})
export class ApiModule {
  public static forRoot(): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        { provide: ConfigConfig, useFactory: configFactory },
        { provide: BASE_PATH_CONFIG, useFactory: basePathFactory },
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n'
        + 'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
