import { Link } from 'react-router-dom'

const EXTERNAL = /^(https?:|mailto:|tel:)/

// Single place for all internal and external links.
// "#section" becomes "/#section" so hash links work from any page.
export default function AppLink({ to, href, children, ...rest }) {
  const target = to ?? href ?? '/'

  if (EXTERNAL.test(target)) {
    return <a href={target} {...rest}>{children}</a>
  }
  if (target.startsWith('#')) {
    return <Link to={`/${target}`} {...rest}>{children}</Link>
  }
  return <Link to={target} {...rest}>{children}</Link>
}
