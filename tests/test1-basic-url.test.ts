import { test, expect } from "bun:test"
import { createSnippetUrl } from "lib"

declare module "bun:test" {
  interface Matchers<T = unknown> {
    toMatchInlineSnapshot(snapshot?: string | null): Promise<MatcherResult>
  }
}

test("create snippets url", () => {
  const url = createSnippetUrl(`
export default () => (
  <board width="10mm" height="10mm">
    <resistor resistance="1k" footprint="0402" name="R1" schX={3} pcbX={3} />
  </board>
)
`)

  expect(url).toMatchInlineSnapshot(`"https://tscircuit.com/editor?#data:application/gzip;base64,H4sIAJ97eWcAAy2NTQ7CIBhE95xiwqpdtVWXhUO4ckuBClF+Ap/RxHh30Xb3JvMyw+wrp0IwdlWPO6HrISQ6BsxLUsXg6Q05wacxBA5n/dXRnmSTmlZs9ZVSwQYqatuEG8eaEuXiY/PH03jgiCq06jxxVO0u4n38IOtlg+G3Ng//T8l69gUyPWjAmAAAAA=="`)
})
