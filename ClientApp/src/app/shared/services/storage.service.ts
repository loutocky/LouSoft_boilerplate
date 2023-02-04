import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {

  }

  setStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getStorage(key: string) {
    return localStorage.getItem(key) || '';
  }

  getStorageObject(key: string, defaults: any) {
    const str = this.getStorage(key);
    if (str) {
      return JSON.parse(str);
    }
    return defaults;
  }

  setStorageObject(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

@Injectable()
export class StorageSessionService {
  constructor() {

  }

  setStorage(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getStorage(key: string) {
    return sessionStorage.getItem(key) || '';
  }

  getStorageObject(key: string, defaults: any) {
    const str = this.getStorage(key);
    if (str) {
      return JSON.parse(str);
    }
    return defaults;
  }

  setStorageObject(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
