import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { SharedService } from './services/shared.service';
import {
  StorageService,
  StorageSessionService,
} from './services/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoggerModule,
  ],
  declarations: [

  ],
  providers: [StorageService, StorageSessionService, SharedService],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [

      ],
    };
  }
}
