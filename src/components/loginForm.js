import { useState } from 'react'
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { startLoginUser } from '../actions/userAction'
import { useNavigate, Link } from 'react-router-dom' // Replace useHistory with useNavigate

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate() // Replace useHistory with useNavigate
  const error = useSelector((state) => state.user.error)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [validationError, setValidationError] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      dispatch(startLoginUser(formData, navigate)) // Pass navigate instead of history
    }
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setValidationError('Email and password are required.')
      setShowForgotPassword(true)
      return false
    }
    setValidationError('')
    setShowForgotPassword(false)
    return true
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            {validationError && <Alert variant="danger">{validationError}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label> <br />
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              /> <br />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label> <br />
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              /> <br />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>  <br />
            {showForgotPassword && ( 
              <div className="mt-3">
                <Link to="/forgot-password" className="btn btn-link text-danger">Forgot Password</Link>
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
