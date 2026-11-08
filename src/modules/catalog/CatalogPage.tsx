import { use, useState } from 'react'
import { catalogPromise, photoManifestPromise } from './catalog-resource'
import { selectProducts } from './catalog.logic'
import type { SortOrder } from './catalog.types'
import { ProductCard } from './ProductCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { PageHeading } from '../../components/ui/PageHeading'

export default function CatalogPage() {
  const productRequest = catalogPromise()
  const photoRequest = photoManifestPromise()
  const products = use(productRequest)
  const photos = use(photoRequest)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState<SortOrder>('default')
  const categories = [...new Set(products.map((product) => product.category))]
  const visible = selectProducts(products, search, category, sort)

  return (
    <div className="container page-shell">
      <PageHeading eyebrow="THE COMPLETE EDIT" title="Catalog" />
      <div className="catalog-controls">
        <div className="search-field">
          <label htmlFor="product-search">Search products</label>
          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="sort-field">
          <label htmlFor="product-category">Category</label>
          <select
            id="product-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="sort-field">
          <label htmlFor="product-sort">Sort by</label>
          <select
            id="product-sort"
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value === 'price-asc' ||
                  event.target.value === 'price-desc'
                  ? event.target.value
                  : 'default',
              )
            }
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>
      <p aria-live="polite">{visible.length} products found</p>
      {products.length === 0 ? (
        <EmptyState
          title="No products available."
          message="Check back later."
        />
      ) : visible.length === 0 ? (
        <EmptyState
          title="No matching products."
          message="Try another search or category."
        >
          <button
            className="secondary-button"
            onClick={() => {
              setSearch('')
              setCategory('all')
            }}
          >
            Reset filters
          </button>
        </EmptyState>
      ) : (
        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              photo={photos.get(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
