export function bytesToBase64(bytes: Uint8Array): string {
  const binString = String.fromCodePoint(...bytes)
  return btoa(binString)
}

export function base64ToBytes(base64: string): Uint8Array {
  const binString = atob(base64)
  return new Uint8Array(binString.split("").map((c) => c.charCodeAt(0)))
}
