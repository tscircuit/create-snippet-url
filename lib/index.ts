import { gzipSync, strToU8 } from "fflate"
import { bytesToBase64 } from "./bytesToBase64"

export function getCompressedBase64SnippetString(text: string) {
  // Compress the input string
  const compressedData = gzipSync(strToU8(text))

  // Convert to base64
  const base64Data = bytesToBase64(compressedData)

  return base64Data
}

export function getBase64PoundSnippetString(text: string) {
  const base64Data = getCompressedBase64SnippetString(text)
  return `#data:application/gzip;base64,${base64Data}`
}

export function createSnippetUrl(text: string, snippet_type?: string): string {
  // Construct the URL
  const typeParam = snippet_type ? `&snippet_type=${snippet_type}` : ""

  return `https://tscircuit.com/editor?${typeParam}${getBase64PoundSnippetString(text)}`
}
