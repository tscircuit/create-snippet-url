# @tscircuit/create-snippet-url

Open tscircuit code on snippets (snippets url creator)

## Usage

```ts
import { createSnippetUrl } from "@tscircuit/create-snippet-url"

createSnippetUrl(`
export default () => (
  <board width="10mm" height="10mm">
    <resistor
      resistance="1k"
      footprint="0402"
      name="R1"
      schX={3}
      pcbX={3}
    />
  </board>
)
`)
// https://tscircuit.com/editor?&snippet_type=board#data:application/gzip;base64,H4sIALJ5eWcAA0XOvQ7CIBDA8b1PcWFqp1J1LDyEkysFKkT5CJzRxPju0pam4+/yv9zpTwwJQelZvJ4IbQeMQ9sAjFMQScHbKjSMDNQ5Akbbu8EqXqKSJZ1txpBWAWwUXuqSPUidziFgTNaXXXqhp33shSvZddidpbmx7/lXGeV0sF/ujf36FW+6P0OaJ9u4AAAA
```
