import { readFileSync, existsSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { parseProducts } from '../src/shared/api'
describe('shipped catalog assets', () => {
  it('ships sixteen validated products across eight categories with matching local photographs', () => {
    const products = parseProducts(
      JSON.parse(readFileSync('public/data/products.json', 'utf8')),
    )
    expect(products).toHaveLength(16)
    expect(new Set(products.map((p) => p.category)).size).toBe(8)
    for (const p of products) {
      expect(existsSync(`public/${p.image}`)).toBe(true)
      const bytes = readFileSync(`public/${p.image}`)
      expect(bytes[0]).toBe(0xff)
      expect(bytes[1]).toBe(0xd8)
      expect(bytes.length).toBeGreaterThan(5000)
    }
  })
})
import { photoCredits } from '../src/shared/photo-credits'
it('credits every shipped category photo with author, source, license and resize details', () => {
  const products = parseProducts(
    JSON.parse(readFileSync('public/data/products.json', 'utf8')),
  )
  const expected = new Set(products.map((p) => p.image))
  expect(photoCredits).toHaveLength(expected.size)
  for (const credit of photoCredits) {
    expect(expected.has(credit.file)).toBe(true)
    expect(credit.author).toBeTruthy()
    expect(credit.title).toBeTruthy()
    expect(credit.source).toMatch(
      /^https:\/\/commons.wikimedia.org\/wiki\/File:/,
    )
    expect(credit.licenseUrl).toMatch(/^https?:\/\/creativecommons.org\//)
    expect(credit.changes).toBeTruthy()
  }
})
