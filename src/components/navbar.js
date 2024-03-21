import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Container } from 'react-bootstrap'

const NavBar = ({ userLoggedIn, handleAuth, role }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  console.log('id:', id)
  console.log('Role:', role)
  const dispatch = useDispatch()
  
  const user = useSelector((state) => state.user)

  console.log('user', user)
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/account">
                  Account
                </Nav.Link>
                {role === 'admin' && ( 
                  <>
                    <Nav.Link as={Link} to="/create-employee">
                      Create Employee
                    </Nav.Link>

                    <Nav.Link as={Link} to="/employees-list">
                      Employees List
                    </Nav.Link>
                  </>
                )}
                <Nav.Link
                  as={Link}
                  to="/"
                  onClick={() => {
                    localStorage.removeItem('token')
                    alert('Successfully logged out')
                    handleAuth()
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
