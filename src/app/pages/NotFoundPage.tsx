import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="container page-shell">
      <h1>Page not found</h1>
      <p>That page is not in this shop.</p>
      <Link to="/">Back to home</Link>
    </div>
  )
}
