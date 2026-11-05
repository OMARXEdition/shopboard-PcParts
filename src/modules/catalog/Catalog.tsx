import { useState } from 'react'
import type { Product, SortOrder } from './catalog.types'
import { selectProducts } from './catalog.logic'
import { ProductCard } from './ProductCard'
export interface CatalogProps {
  products: Product[]
  onView: (product: Product) => void
  onAdd: (product: Product) => void
}
export function Catalog({ products, onView, onAdd }: CatalogProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState<SortOrder>('default')
  const visible = selectProducts(products, search, category, sort)
  const categories = [...new Set(products.map((p) => p.category))]
  return (
    <section
      className="catalog-section container"
      id="catalog"
      aria-labelledby="catalog-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE GOOD STUFF</p>
          <h2 id="catalog-title">
            Find your next upgrade<span aria-hidden="true">_</span>
          </h2>
        </div>
        <span className="demo-badge">PC PARTS / DEMO CATALOG</span>
      </div>
      <div className="catalog-layout">
        <aside className="filter-sidebar">
          <h3>Browse by part</h3>
          <nav aria-label="Product categories">
            {['all', ...categories].map((c) => (
              <button
                key={c}
                className={`category-button ${c === category ? 'active' : ''}`}
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
              >
                <span aria-hidden="true">{c === category ? '▸' : '◇'}</span>{' '}
                {c === 'all' ? 'All parts' : c}
              </button>
            ))}
          </nav>
          <div className="sidebar-note">
            <span aria-hidden="true">✦</span>
            <p>
              New build?
              <br />
              Start with a little curiosity.
            </p>
          </div>
        </aside>
        <div className="catalog-main">
          <div className="toolbar">
            <div className="search-field">
              <label htmlFor="search">Find a part</label>
              <input
                id="search"
                type="search"
                placeholder="Search the shelves..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="sort-field">
              <label htmlFor="sort">Sort by</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) =>
                  setSort(
                    e.target.value === 'price-asc' ||
                      e.target.value === 'price-desc'
                      ? e.target.value
                      : 'default',
                  )
                }
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>
          <p className="catalog-count" aria-live="polite">
            <span className="numeric">{visible.length}</span> parts found{' '}
            <span className="muted">/ ready for a fresh start</span>
          </p>
          {!products.length ? (
            <div className="empty-state">
              <h3>No parts on the shelf yet.</h3>
              <p>Come back when the catalog has been restocked.</p>
            </div>
          ) : !visible.length ? (
            <div className="empty-state">
              <h3>No matching parts.</h3>
              <p>Try another search or category.</p>
              <button
                className="secondary-button"
                onClick={() => {
                  setSearch('')
                  setCategory('all')
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {visible.map((product, position) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  position={position + 1}
                  onView={onView}
                  onAdd={onAdd}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
