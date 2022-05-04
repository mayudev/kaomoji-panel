export function usePreferences() {
  function get<T>(item: string, fallbackValue: T): T {
    const value = localStorage.getItem(item);
    if (value === null) return fallbackValue;
    else return JSON.parse(value);
  }

  function set<T>(item: string, value: T) {
    return localStorage.setItem(item, JSON.stringify(value));
  }

  function remove(item: string) {
    return localStorage.removeItem(item);
  }

  return { get, set, remove };
}
