import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'
import { it, expect } from 'vitest'
function filesAt(path: string): string[] {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? filesAt(join(path, entry.name))
      : /\.tsx?$/.test(entry.name)
        ? [join(path, entry.name)]
        : [],
  )
}
it('uses separate typed reusable components and keeps hooks separate', () => {
  for (const file of [
    'src/app/Header.tsx',
    'src/app/Hero.tsx',
    'src/app/Footer.tsx',
    'src/app/Store.tsx',
    'src/shared/ProductImage.tsx',
    'src/shared/Modal.tsx',
    'src/shared/WindowBar.tsx',
    'src/modules/catalog/ProductCard.tsx',
    'src/shared/useToast.ts',
    'src/modules/cart/useCart.ts',
  ])
    expect(existsSync(file), file).toBe(true)
})
it('contains no explicit any, type assertions or non-null assertions in application TypeScript', () => {
  const violations: string[] = []
  for (const file of filesAt('src')) {
    const source = ts.createSourceFile(
      file,
      readFileSync(file, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
      file.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    )
    const visit = (node: ts.Node) => {
      if (
        ts.isAsExpression(node) ||
        ts.isTypeAssertionExpression(node) ||
        ts.isNonNullExpression(node) ||
        node.kind === ts.SyntaxKind.AnyKeyword
      )
        violations.push(file + ': ' + node.getText(source))
      ts.forEachChild(node, visit)
    }
    visit(source)
  }
  expect(violations).toEqual([])
})
it('uses pixel art only in the hero and real category photos in the catalog', () => {
  expect(readFileSync('src/app/Hero.tsx', 'utf8')).toContain('art/hero.svg')
  const products: unknown = JSON.parse(
    readFileSync('public/data/products.json', 'utf8'),
  )
  expect(
    Array.isArray(products) &&
      products.every(
        (p) =>
          typeof p === 'object' &&
          p !== null &&
          'image' in p &&
          typeof p.image === 'string' &&
          p.image.startsWith('photos/'),
      ),
  ).toBe(true)
})
