import { test, expect } from "bun:test"
import { createBrowserPreviewUrl, createPngUrl, createSvgUrl } from "lib"
import { gunzipSync, strFromU8 } from "fflate"

test("create pcb svg url", () => {
  const url = createSvgUrl(
    `
export default () => (
  <board width="10mm" height="10mm">
    <resistor resistance="1k" footprint="0402" name="R1" schX={3} pcbX={3} />
  </board>
)
`,
    "pcb",
  )

  expect(url).toMatchInlineSnapshot(
    `"https://svg.tscircuit.com/?svg_type=pcb&code=H4sIAJsBqGcAAy2NTQ7CIBhE9z3FhFW7KlWXhUO4ckuBClF%2BAp%2FRxHh30Xb3JvMyY185FYKxq3rcCf0AIdF3wLwkVQye3pATbOIhMDjrr472JJvUtGKrr5QKNlBR2ybcGNaUKBcfm89P%2FMAQVWjVeWKo2l3E%2B%2FhB1ssG429tHv%2Bfshu%2BlSYxzJYAAAA%3D"`,
  )
})

test("create svg url using fs map", () => {
  const url = createSvgUrl(
    {
      "index.tsx": `export default () => (\n  <board />\n)`,
    },
    "pcb",
  )

  const parsed = new URL(url)
  expect(parsed.searchParams.get("code")).toBeNull()
  const fsMapParam = parsed.searchParams.get("fs_map")
  expect(fsMapParam).not.toBeNull()

  const encodedFsMap = Buffer.from(fsMapParam!, "base64")
  const decodedFsMap = JSON.parse(
    strFromU8(gunzipSync(Uint8Array.from(encodedFsMap))),
  )

  expect(decodedFsMap).toEqual({
    "index.tsx": "export default () => (\n  <board />\n)",
  })
})

test("fs map svg url passes entrypoint", () => {
  const url = createSvgUrl(
    {
      "index.tsx": "export default () => null",
      "App.tsx": "export default () => null",
    },
    "schematic",
    { entrypoint: "App.tsx" },
  )

  const parsed = new URL(url)
  expect(parsed.searchParams.get("entrypoint")).toBe("App.tsx")
  expect(parsed.searchParams.get("fs_map")).not.toBeNull()
  expect(parsed.searchParams.get("code")).toBeNull()
})

test("create svg url with png options", () => {
  const url = createSvgUrl(
    `
export default () => (
  <board width="10mm" height="10mm">
    <resistor resistance="1k" footprint="0402" name="R1" schX={3} pcbX={3} />
  </board>
)
`,
    "pcb",
    {
      format: "png",
      pngWidth: 800,
      pngHeight: 600,
      pngDensity: 2,
    },
  )

  const parsed = new URL(url)
  expect(parsed.searchParams.get("format")).toBe("png")
  expect(parsed.searchParams.get("png_width")).toBe("800")
  expect(parsed.searchParams.get("png_height")).toBe("600")
  expect(parsed.searchParams.get("png_density")).toBe("2")
  expect(parsed.searchParams.get("code")).not.toBeNull()
})

test("create png url uses svg.tscircuit.com", () => {
  const url = createPngUrl(
    `
export default () => (
  <board width="10mm" height="10mm">
    <resistor resistance="1k" footprint="0402" name="R1" schX={3} pcbX={3} />
  </board>
)
`,
    "pcb",
  )

  const parsed = new URL(url)
  expect(parsed.origin).toBe("https://svg.tscircuit.com")
  expect(parsed.searchParams.get("svg_type")).toBe("pcb")
  expect(parsed.searchParams.get("format")).toBe("png")
  expect(parsed.searchParams.get("code")).not.toBeNull()
})

test("create pinout svg url", () => {
  const url = createSvgUrl(
    `
export default () => (
  <board width="10mm" height="10mm">
    <resistor resistance="1k" footprint="0402" name="R1" schX={3} pcbX={3} />
  </board>
)
`,
    "pinout",
  )

  expect(url).toMatchInlineSnapshot(
    `"https://svg.tscircuit.com/?svg_type=pinout&code=H4sIAJsBqGcAAy2NTQ7CIBhE9z3FhFW7KlWXhUO4ckuBClF%2BAp%2FRxHh30Xb3JvMyY185FYKxq3rcCf0AIdF3wLwkVQye3pATbOIhMDjrr472JJvUtGKrr5QKNlBR2ybcGNaUKBcfm89P%2FMAQVWjVeWKo2l3E%2B%2FhB1ssG429tHv%2Bfshu%2BlSYxzJYAAAA%3D"`,
  )
})

test("create schsim svg url", () => {
  const url = createSvgUrl(
    `
export default () => (
  <board width="10mm" height="10mm">
    <resistor resistance="1k" footprint="0402" name="R1" schX={3} pcbX={3} />
  </board>
)
`,
    "schsim",
  )

  expect(url).toMatchInlineSnapshot(
    `"https://svg.tscircuit.com/?svg_type=schsim&code=H4sIAJsBqGcAAy2NTQ7CIBhE9z3FhFW7KlWXhUO4ckuBClF%2BAp%2FRxHh30Xb3JvMyY185FYKxq3rcCf0AIdF3wLwkVQye3pATbOIhMDjrr472JJvUtGKrr5QKNlBR2ybcGNaUKBcfm89P%2FMAQVWjVeWKo2l3E%2B%2FhB1ssG429tHv%2Bfshu%2BlSYxzJYAAAA%3D"`,
  )
})

test("create sim svg url", () => {
  const url = createSvgUrl(
    `
export default () => (
  <board width="10mm" height="10mm">
    <resistor resistance="1k" footprint="0402" name="R1" schX={3} pcbX={3} />
  </board>
)
`,
    "sim",
  )

  expect(url).toMatchInlineSnapshot(
    `"https://svg.tscircuit.com/?svg_type=sim&code=H4sIAJsBqGcAAy2NTQ7CIBhE9z3FhFW7KlWXhUO4ckuBClF%2BAp%2FRxHh30Xb3JvMyY185FYKxq3rcCf0AIdF3wLwkVQye3pATbOIhMDjrr472JJvUtGKrr5QKNlBR2ybcGNaUKBcfm89P%2FMAQVWjVeWKo2l3E%2B%2FhB1ssG429tHv%2Bfshu%2BlSYxzJYAAAA%3D"`,
  )
})

test("create schsim svg url with simulation experiment id", () => {
  const url = createSvgUrl(
    `
export default () => (
  <board width="10mm" height="10mm">
    <resistor resistance="1k" footprint="0402" name="R1" schX={3} pcbX={3} />
  </board>
)
`,
    "schsim",
    {
      simulationExperimentId: "my-exp-1",
    },
  )

  const parsed = new URL(url)
  expect(parsed.searchParams.get("simulation_experiment_id")).toBe("my-exp-1")
})

test("create assembly svg, png, and browser preview urls", () => {
  const code = `
export default () => (
  <board width="10mm" height="10mm">
    <resistor resistance="1k" footprint="0402" name="R1" schX={3} pcbX={3} />
  </board>
)
`
  const svgUrl = createSvgUrl(code, "assembly")
  expect(svgUrl).toMatchInlineSnapshot(
    `"https://svg.tscircuit.com/?svg_type=assembly&code=H4sIAJsBqGcAAy2NTQ7CIBhE9z3FhFW7KlWXhUO4ckuBClF%2BAp%2FRxHh30Xb3JvMyY185FYKxq3rcCf0AIdF3wLwkVQye3pATbOIhMDjrr472JJvUtGKrr5QKNlBR2ybcGNaUKBcfm89P%2FMAQVWjVeWKo2l3E%2B%2FhB1ssG429tHv%2Bfshu%2BlSYxzJYAAAA%3D"`,
  )

  const pngUrl = createPngUrl(code, "assembly", { pngWidth: 640 })
  const parsedPng = new URL(pngUrl)
  expect(parsedPng.origin).toBe("https://svg.tscircuit.com")
  expect(parsedPng.searchParams.get("svg_type")).toBe("assembly")
  expect(parsedPng.searchParams.get("format")).toBe("png")
  expect(parsedPng.searchParams.get("png_width")).toBe("640")

  const previewUrl = createBrowserPreviewUrl(code, "assembly")
  const parsedPreview = new URL(previewUrl)
  expect(parsedPreview.origin).toBe("https://browser-preview.tscircuit.com")
  expect(parsedPreview.searchParams.get("view")).toBe("assembly")
  expect(parsedPreview.searchParams.get("code")).not.toBeNull()
})
