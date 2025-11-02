import { gzipSync, gunzipSync, strToU8, strFromU8 } from "fflate"
import { base64ToBytes, bytesToBase64 } from "./bytesToBase64"

export type FsMap = Record<string, string>

export type CreateSvgUrlOptions = {
  format?: "svg" | "png"
  pngWidth?: number
  pngHeight?: number
  pngDensity?: number
  entrypoint?: string
  simulationExperimentId?: string
  showSolderMask?: boolean
}

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
  snippetOrFsMap: string | FsMap,
  svgType: "pcb" | "schematic" | "3d" | "pinout" | "schsim",
  options: CreateSvgUrlOptions = {},
) {
  const search = new URLSearchParams()
  search.set("svg_type", svgType)

  if (typeof snippetOrFsMap === "string") {
    const base64Data = getCompressedBase64SnippetString(snippetOrFsMap)
    search.set("code", base64Data)
  } else if (snippetOrFsMap && typeof snippetOrFsMap === "object") {
    const encodedFsMap = encodeFsMap(snippetOrFsMap)
    search.set("fs_map", encodedFsMap)

    if (options.entrypoint) {
      search.set("entrypoint", options.entrypoint)
    }
  } else {
    throw new Error("Invalid snippet or fsMap provided to createSvgUrl")
  }

  if (options.format) {
    search.set("format", options.format)
  }
  if (options.pngWidth !== undefined) {
    search.set("png_width", String(options.pngWidth))
  }
  if (options.pngHeight !== undefined) {
    search.set("png_height", String(options.pngHeight))
  }
  if (options.pngDensity !== undefined) {
    search.set("png_density", String(options.pngDensity))
  }
  if (options.simulationExperimentId) {
    search.set("simulation_experiment_id", options.simulationExperimentId)
  }
  if (options.showSolderMask !== undefined) {
    search.set("show_solder_mask", options.showSolderMask ? "1" : "0")
  }

  const query = search.toString()
  return `https://svg.tscircuit.com/?${query}`
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

function encodeFsMap(fsMap: FsMap) {
  const json = JSON.stringify(fsMap)
  const compressedData = gzipSync(strToU8(json), {
    mtime: 1739063707691,
  })
  return bytesToBase64(compressedData)
}
