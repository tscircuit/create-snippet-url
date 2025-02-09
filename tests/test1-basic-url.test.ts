import { test, expect } from "bun:test"
import {
  createSnippetUrl,
  getUncompressedSnippetString,
  getBase64PoundSnippetString,
} from "lib"

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

  expect(url).toMatchInlineSnapshot(
    `"https://tscircuit.com/editor?#data:application/gzip;base64,H4sIAJsBqGcAAy2NTQ7CIBhE9z3FhFW7KlWXhUO4ckuBClF+Ap/RxHh30Xb3JvMyY185FYKxq3rcCf0AIdF3wLwkVQye3pATbOIhMDjrr472JJvUtGKrr5QKNlBR2ybcGNaUKBcfm89P/MAQVWjVeWKo2l3E+/hB1ssG429tHv+fshu+lSYxzJYAAAA="`,
  )
})
