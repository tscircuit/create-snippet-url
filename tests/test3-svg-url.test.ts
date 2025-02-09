import { test, expect } from "bun:test"
import { createSvgUrl } from "lib"

test("create snippets url", () => {
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
