# @tscircuit/create-snippet-url

Open tscircuit code on snippets (snippets URL creator)

## Installation

```bash
bun add @tscircuit/create-snippet-url
```

## Usage

### Basic Usage

```ts
import { createSnippetUrl } from "@tscircuit/create-snippet-url"

// Create a board with a resistor
const url = createSnippetUrl(`
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
```
