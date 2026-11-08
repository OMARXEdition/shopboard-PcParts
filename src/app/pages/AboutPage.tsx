import { Link } from 'react-router-dom'
import { PageHeading } from '../../components/ui/PageHeading'

export default function AboutPage() {
  return (
    <div className="container page-shell">
      <PageHeading title="About ShopBoard" />
      <p>
        This is a multi-page React storefront built for the ShopBoard course
        API. Its catalog and product pages use live API data.
      </p>
      <p>
        Products, prices, and stock are demonstration data. This site does not
        process payments or create orders.
      </p>
      <Link to="/products">Explore the catalog</Link>
    </div>
  )
}
