export const clone = <T extends Object>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}
