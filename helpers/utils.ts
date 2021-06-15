export const clone = <T extends Object>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const fileToDataUrl = (file: unknown): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const toBase64 = async (file: unknown): Promise<string> => {
  let result = await fileToDataUrl(file)
  result = result.replace('data:', '').replace(/^.+,/, '')

  return result
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
