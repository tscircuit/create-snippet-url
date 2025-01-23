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
    `"https://svg.tscircuit.com/?svg_type=pcb&code=H4sIAN2jkmcAAy2NTQ7CIBhE95xiwqpdtVWXhUO4ckuBClF%2BAp%2FRxHh30Xb3JvMyw%2Bwrp0IwdlWPO6HrISQ6BsxLUsXg6Q05wacxBA5n%2FdXRnmSTmlZs9ZVSwQYqatuEG8eaEuXiY%2FPH03jgiCq06jxxVO0u4n38IOtlg%2BG3Ng%2F%2FT8l69gUyPWjAmAAAAA%3D%3D"`,
  )
})
