import { gzipSync, gunzipSync, strToU8, strFromU8 } from "fflate"
import { base64ToBytes, bytesToBase64 } from "./bytesToBase64"

export function getCompressedBase64SnippetString(text: string) {
  // Compress the input string
  const compressedData = gzipSync(strToU8(text.trim()), {
    mtime: 1739063707691, // Date.now() when i wrote this line, ensures consistent output
  })

  // Convert to base64
  const base64Data = bytesToBase64(compressedData)

  return base64Data
}

export function getBase64PoundSnippetString(text: string) {
  const base64Data = getCompressedBase64SnippetString(text.trim())
  return `#data:application/gzip;base64,${base64Data}`
}

export function getUncompressedSnippetString(
  base64CompressedSnippetString: string,
) {
  const base64Data = base64CompressedSnippetString.split(",").pop()
  const compressedData = base64ToBytes(base64Data!)
  const uncompressedData = gunzipSync(compressedData)
  return strFromU8(uncompressedData)
}

export function createSvgUrl(
  tscircuitCode: string,
  svgType: "pcb" | "schematic" | "3d" | "pinout",
) {
  const base64Data = getCompressedBase64SnippetString(tscircuitCode)
  return `https://svg.tscircuit.com/?svg_type=${svgType}&code=${encodeURIComponent(base64Data)}`
}

export function createBrowserPreviewUrl(
  tscircuitCode: string,
  view?: "pcb" | "schematic" | "3d",
) {
  const base64Data = getCompressedBase64SnippetString(tscircuitCode)
  return `https://browser-preview.tscircuit.com/?view=${view}&code=${encodeURIComponent(base64Data)}`
}

export function createPngUrl(
  tscircuitCode: string,
  view: "pcb" | "schematic" | "3d",
) {
  const base64Data = getCompressedBase64SnippetString(tscircuitCode)
  return `https://png.tscircuit.com/?view=${view}&code=${encodeURIComponent(base64Data)}`
}

export function createSnippetUrl(text: string, snippet_type?: string): string {
  // Construct the URL
  const typeParam = snippet_type ? `&snippet_type=${snippet_type}` : ""

  return `https://tscircuit.com/editor?${typeParam}${getBase64PoundSnippetString(text)}`
}
