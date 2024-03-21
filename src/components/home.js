import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>Home</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src="/deals.jpg" alt="Banner" style={{ width: '70%', height: 'auto', marginTop: '100px' }} />
        </Col>
      </Row>
    </Container>
  )
}

export default Home
