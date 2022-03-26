export function usePreferences() {
  function get(item: string) {
    return localStorage.getItem(item);
  }

  function set<T>(item: string, value: T) {
    return localStorage.setItem(item, JSON.stringify(value));
  }

  return { get, set };
}
