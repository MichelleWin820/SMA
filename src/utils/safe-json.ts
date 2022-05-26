export function safeParseJson<T>(json: string): T {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    return {} as T;
  }
}
