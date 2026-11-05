import { useState } from 'react'
import type { Product, SortOrder } from './catalog.types'
import { selectProducts } from './catalog.logic'
import { WindowBar, ProductImage } from '../../shared/ui'
import { formatPrice } from '../../shared/format'
export function Catalog({
  products,
  onView,
  onAdd,
}: {
  products: Product[]
  onView: (p: Product) => void
  onAdd: (p: Product) => void
}) {
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
                onChange={(e) => setSort(e.target.value as SortOrder)}
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
              {visible.map((p, i) => (
                <article className="window product-card" key={p.id}>
                  <WindowBar>
                    <span className="numeric">
                      {String(i + 1).padStart(2, '0')}
                    </span>{' '}
                    / {p.category.toUpperCase()}
                  </WindowBar>
                  <button
                    className="product-image-button"
                    aria-label={`View ${p.name}`}
                    onClick={() => onView(p)}
                  >
                    <ProductImage
                      path={p.image}
                      alt={p.alt}
                      className="product-art"
                    />
                  </button>
                  <div className="product-info">
                    <p className="category-label">
                      {p.category} / category photo
                    </p>
                    <h3 className="product-title">{p.name}</h3>
                    <p className="product-description">{p.specs[0].value}</p>
                    <div className="product-bottom">
                      <span className="price numeric">
                        {formatPrice(p.priceCents)}
                      </span>
                      <button
                        className="primary-button"
                        aria-label={`Add ${p.name} to cart`}
                        onClick={() => onAdd(p)}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
