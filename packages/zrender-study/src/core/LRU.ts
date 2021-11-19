export class Entry<T> {
  value: T;

  key: string | number;

  next: Entry<T>;

  prev: Entry<T>;

  constructor(val: T) {
    this.value = val;
  }
}

export class LinkedList<T> {
  head: Entry<T>;
  tail: Entry<T>;

  private _len = 0;

  insert(val: T): Entry<T> {
    const entry = new Entry(val);
    this.insertEntry(entry);
    return entry;
  }

  insertEntry(entry: Entry<T>) {
    if (!this.head) {
      this.head = this.tail = entry;
    } else {
      this.tail.next = entry;
      entry.prev = this.tail;
      entry.next = null;
      this.tail = entry;
    }
    this._len++;
  }

  remove(entry: Entry<T>) {
    const prev = entry.prev;
    const next = entry.next;

    if (prev) {
      prev.next = next;
    } else {
      this.head = next;
    }

    if (next) {
      next.prev = prev;
    } else {
      this.tail = prev;
    }
    entry.next = entry.prev = null;
    this._len--;
  }

  len(): number {
    return this._len;
  }

  clear() {
    this.head = this.tail = null;
    this._len = 0;
  }
}

export default class LRU<T> {
  private _list = new LinkedList<T>();

  private _maxSize = 10;

  private _lastRemovedEntry: Entry<T>;

  private _map = new Map<string | number, Entry<T>>();

  constructor(maxSize: number) {
    this._maxSize = maxSize;
  }

  put(key: string | number, value: T): T {
    const list = this._list;
    const map = this._map;
    let removed = null;
    if (!map.has(key)) {
      const len = list.len();
      
      let entry = this._lastRemovedEntry;

      if (len >= this._maxSize && len > 0) {
        const leastUsedEntry = list.head;
        list.remove(leastUsedEntry);
        map.delete(leastUsedEntry.key);

        removed = leastUsedEntry.value;
        this._lastRemovedEntry = leastUsedEntry;
      }

      if (entry) {
        entry.value = value;
      } else {
        entry = new Entry(value);
      }

      entry.key = key;
      list.insertEntry(entry);
      map.set(key, entry);
    }
    return removed;
  }

  get(key: string | number): T {
    if (this._map.has(key)) {
      const list = this._list;
      const entry = this._map.get(key);
      if (entry !== list.tail) {
        list.remove(entry);
        list.insertEntry(entry);
      }
      return entry.value;
    }
  }

  clear() {
    this._list.clear();
    this._map = new Map<string | number, Entry<T>>();
  }

  len() {
    return this._list.len();
  }
}