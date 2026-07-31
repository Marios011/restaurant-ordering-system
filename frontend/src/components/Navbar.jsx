import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand mb-0" to="/">
          Restaurant Ordering System
        </Link>

        <Link className="btn btn-outline-light" to="/create-order">
          +
        </Link>
		

      </div>
    </nav>
  )
}

export default Navbar