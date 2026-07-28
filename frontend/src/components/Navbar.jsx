import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Restaurant Ordering System
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/menu">
            Menu
          </Link>
          <Link className="nav-link" to="/tables">
            Tables
          </Link>
          <Link className="nav-link" to="/orders">
            Orders
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar