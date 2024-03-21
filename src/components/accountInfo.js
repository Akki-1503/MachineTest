import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetUserAccount } from '../actions/userAction'
import { Container, Row, Col, Alert } from 'react-bootstrap' 

function AccountInfo() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user) 
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const role = useSelector((state) => state.user.role)

  useEffect(() => {
    dispatch(startGetUserAccount())
  }, [dispatch])

  return (
    <Container>
      <h2>Account Information</h2>
      {isAuthenticated ? (
        <Row>
          <Col>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </Col>
        </Row>
      ) : (
        <Alert variant="warning">Please log in to view your account information.</Alert>
      )}
    </Container>
  )
}

export default AccountInfo
