import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {

  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage.set(key, value);
  }

  public async get(key: string) {
    return this._storage.get(key);
  }

  public async remove(key: string) {
    return this._storage.remove(key);
  }

  public async clear() {
    return this._storage.clear();
  }

  public async keys() {
    return this._storage.keys();
  }

}
