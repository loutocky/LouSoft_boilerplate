import { Injectable } from '@angular/core';
import { Constants } from '../models/constants';
import { StorageService } from './storage.service';

@Injectable()
export class SharedService {

  constructor(
    private storage: StorageService,
  ) {

  }
}
