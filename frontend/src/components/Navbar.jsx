import { Link, useLocation } from 'react-router-dom'

function Navbar({ user, logout }) {
  const location = useLocation()


  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?')

    if (confirmed) {
      logout()
    }
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link
        to={user?.role === 'admin' ? '/admin' : '/'}
        className="navbar-brand"
      >
        Restaurant Ordering System
      </Link>

      <div className="d-flex align-items-center gap-2 ms-auto">
        {user?.role === 'waiter' && (
          <>
            <Link className="btn btn-outline-light" to="/create-order">
              +
            </Link>
          </>
        )}


      </div>
    </nav>
  )
}

export default Navbar