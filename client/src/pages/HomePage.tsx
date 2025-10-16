import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🏠 Welcome to ROOME</h1>
      <p>Room Booking Management System</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/login" style={{ marginRight: '1rem' }}>
          Login
        </Link>
      </div>
    </div>
  )
}

export default HomePage
