import { strict as assert } from "node:assert"
import { test } from "node:test"
import { base64ToBytes, bytesToBase64 } from "../lib/bytesToBase64.ts"

for (const [text, expected] of [
  ["", ""],
  ["f", "Zg=="],
  ["fo", "Zm8="],
  ["foo", "Zm9v"],
  ["foob", "Zm9vYg=="],
  ["fooba", "Zm9vYmE="],
  ["foobar", "Zm9vYmFy"],
]) {
  test(`encodes the base64 vector ${JSON.stringify(text)}`, () => {
    const bytes = new TextEncoder().encode(text)
    assert.equal(bytesToBase64(bytes), expected)
    assert.deepEqual(base64ToBytes(expected), bytes)
  })
}

for (const length of [32767, 32768, 32769, 65535, 65536, 65537, 1048576]) {
  test(`encodes all byte values in a ${length}-byte input`, () => {
    const bytes = Uint8Array.from({ length }, (_, index) => index % 256)
    const original = bytes.slice()
    const encoded = bytesToBase64(bytes)

    assert.equal(encoded, Buffer.from(bytes).toString("base64"))
    assert.deepEqual(base64ToBytes(encoded), bytes)
    assert.deepEqual(bytes, original)
  })
}

test("encodes only the bytes in a large offset view", () => {
  const backing = Uint8Array.from({ length: 1048580 }, (_, index) => index % 256)
  const view = backing.subarray(1, 1048578)
  const original = backing.slice()

  assert.equal(bytesToBase64(view), Buffer.from(view).toString("base64"))
  assert.deepEqual(backing, original)
})
