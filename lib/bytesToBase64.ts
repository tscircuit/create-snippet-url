export function bytesToBase64(bytes: Uint8Array): string {
  let binString = ""
  // Bound each argument list so large compressed snippets do not overflow it.
  const chunkSize = 32768
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binString += String.fromCodePoint(
      ...bytes.subarray(offset, offset + chunkSize),
    )
  }
  return btoa(binString)
}

export function base64ToBytes(base64: string): Uint8Array {
  const binString = atob(base64)
  return new Uint8Array(binString.split("").map((c) => c.charCodeAt(0)))
}
