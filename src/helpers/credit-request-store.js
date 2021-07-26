import {CREDIT_REQUEST_DATA} from '../constants/credit-request-data';

class CreditRequestStore {
  /**
   * @param {Storage} storage
   * @param {string} mapKey
   */
  constructor(storage, mapKey) {
    this._storage = storage;
    this._mapKey = mapKey;
  }

  /**
   * @param {{id: number}} defaultMap
   * @return {{id: number}}
   */
  getMap(defaultMap = CREDIT_REQUEST_DATA.defaultMap) {
    try {
      return JSON.parse(this._storage.getItem(this._mapKey)) || defaultMap;
    } catch (_error) {
      return defaultMap;
    }
  }

  /**
   * @param {object} patch
   * @return {boolean}
   */
  patchMap(patch) {
    try {
      const newMap = {...this.getMap(), ...patch};
      this._storage.setItem(this._mapKey, JSON.stringify(newMap));
      return true;
    } catch (_error) {
      return false;
    }
  }
}

export const creditRequestStore = new CreditRequestStore(localStorage, CREDIT_REQUEST_DATA.storeKey);
