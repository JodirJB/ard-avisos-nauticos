import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() { }

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  public hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
