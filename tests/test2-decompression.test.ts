import { test, expect } from "bun:test"
import {
  createSnippetUrl,
  getUncompressedSnippetString,
  getBase64PoundSnippetString,
} from "lib"

test("decompress snippet string", () => {
  const originalText = `                                        
export default () => (                                          
  <board width="10mm" height="10mm">                            
    <resistor resistance="1k" footprint="0402" name="R1" schX={ 
pcbX={3} />                                                     
  </board>                                                      
)                                                               
`

  const compressed = getBase64PoundSnippetString(originalText)
  const uncompressed = getUncompressedSnippetString(compressed)
  expect(uncompressed).toEqual(originalText.trim())
})
