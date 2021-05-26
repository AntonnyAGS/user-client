export const clone = <T extends Object>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const toBase64 = (file: unknown): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
