const TEST_KEY = '@MILKSCOUT_KEY';

// https://github.com/capaj/localstorage-polyfill/blob/master/localStorage.js
class SimulatedStorage implements Storage {
  private valuesMap = new Map();

  getItem(key: string) {
    const stringKey = String(key);
    if (this.valuesMap.has(key)) {
      return String(this.valuesMap.get(stringKey));
    }
    return null;
  }

  setItem(key: string, value: string) {
    this.valuesMap.set(String(key), String(value));
  }

  removeItem(key: string) {
    this.valuesMap.delete(key);
  }

  clear() {
    this.valuesMap.clear();
  }

  key(index: number): string | null {
    if (arguments.length === 0) {
      // this is a TypeError implemented on Chrome, Firefox throws Not enough arguments to Storage.key.
      throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.");
    }
    const arr = Array.from(this.valuesMap.keys());
    return arr[index];
  }

  get length() {
    return this.valuesMap.size;
  }
}

const selectLocalStorage = () => {
  try {
    // test if local storage is accessible
    localStorage.setItem(TEST_KEY, '');
    localStorage.getItem(TEST_KEY);
    localStorage.removeItem(TEST_KEY);
    return localStorage;
  } catch (e) {
    return new SimulatedStorage();
  }
};

const selectSessionStorage = () => {
  try {
    // test if session storage is accessible
    sessionStorage.setItem(TEST_KEY, '');
    sessionStorage.getItem(TEST_KEY);
    sessionStorage.removeItem(TEST_KEY);
    return sessionStorage;
  } catch (e) {
    return new SimulatedStorage();
  }
};

const localStorageChecked: Storage = selectLocalStorage();
const sessionStorageChecked: Storage = selectSessionStorage();

export { localStorageChecked as LocalStorage };
export { sessionStorageChecked as SessionStorage };
