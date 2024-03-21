import React, { useContext, useState } from 'react'
import { EmployeeContext } from './empContext'
import { Link } from 'react-router-dom'
import { Card, Button, Form } from 'react-bootstrap'
import axios from 'axios'

const EmployeeList = () => {
  const { employees, setEmployees } = useContext(EmployeeContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleDelete = async (id) => {
    console.log('id', id)
    try {
      const response = await axios.delete(`http://localhost:3321/api/emp/delete/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      if (response.status === 200) {
        setEmployees(employees.filter(emp => emp._id !== id))
        alert('Employee deleted successfully')
      } else {
        console.error('failed to delete employee')
      }
    } catch (err) {
      console.log(err, 'err')
    }
  }

  const handleSearch = () => {
    const filteredEmployees = employees.filter(
      employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSearchResults(filteredEmployees)
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
    handleSearch()
  }

  let displayEmployees = searchQuery ? searchResults : employees

  // Sort the displayEmployees array alphabetically by employee's name
  displayEmployees = displayEmployees.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div>
      {employees.length > 0 && (
        <div>
          <h2>Employee List</h2>
          <p>Total Employees: {employees.length}</p>
          <Form.Control
            type="text"
            placeholder="Search by name or designation"
            value={searchQuery}
            onChange={handleChange}
          />
        </div>
      )}
      {displayEmployees.length === 0 && employees.length > 0 && (
        <p className="text-danger">No employee available with that name and designation</p>
      )}
      <ul>
        {displayEmployees.map((employee) => (
          <li key={employee._id}>
            <div>
              <Card>
                <Card.Img src={employee.avatarUrl} alt="Avatar" style={{ width: '150px', height: '140px', borderRadius: '50%' }} />
                <Card.Body>
                  <Card.Title>Name: {employee.name}</Card.Title>
                  <Card.Text>Email: {employee.email}</Card.Text>
                  <Card.Text>Designation: {employee.designation}</Card.Text>
                  <Card.Text>Gender: {employee.gender}</Card.Text>
                  <Card.Text>Course: {employee.course}</Card.Text>
                  <Card.Text>Mobile: {employee.contact}</Card.Text>
                  <Card.Text>Created At: {new Date(employee.createdAt).toLocaleDateString()}</Card.Text>
                  <Link to={`/edit/${employee._id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(employee._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          </li>
        ))}
      </ul>
      {employees.length === 0 && <p className="text-danger">No employees are available in the list</p>}
    </div>
  )
}

export default EmployeeList
