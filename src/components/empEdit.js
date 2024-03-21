import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Image } from 'react-bootstrap'

const EditEmployee = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    designation: '',
    gender: '',
    course: [],
    avatarUrl: '',
  })
  const [avatarFile, setAvatarFile] = useState(null) 

  useEffect(() => {
    axios.get(`http://localhost:3321/api/emp/show/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
    .then(response => {
      const { name, email, contact, designation, gender, course, avatarUrl } = response.data
      setFormData({
        name,
        email,
        contact,
        designation,
        gender,
        course,
        avatarUrl,
      })
    })
    .catch(error => {
      console.error('Error fetching employee data:', error)
    })
  }, [id])

  console.log('Form Data before appending to FormData:', formData)

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    if (!avatarFile) {
      console.error('Avatar file is required')
      return
    }
  
    const updatedFormData = {
      ...formData,
      avatarUrl: URL.createObjectURL(avatarFile)
    }
  
    const formDataWithAvatar = new FormData()
  
    formDataWithAvatar.append('avatar', avatarFile)
  
    for (const key in updatedFormData) {
      formDataWithAvatar.append(key, updatedFormData[key])
    }
  
    console.log('FormData before sending:', formDataWithAvatar)
  
    try {
      const response = await axios.put(`http://localhost:3321/api/emp/update/${id}`, formDataWithAvatar, {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data', 
        }
      })
      console.log('Response from server:', response) 
      window.alert('Employee updated successfully')
  
      navigate('/')
    } catch (error) {
      console.error('Error updating employee:', error)
    }
  }
     
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setAvatarFile(file)
    setFormData(prevFormData => ({
      ...prevFormData,
      avatarUrl: URL.createObjectURL(file)
    }))
  }

  const handleCourseChange = (e) => {
    const isChecked = e.target.checked
    const courseValue = e.target.value
  
    let updatedCourses = isChecked ? [courseValue] : []
  
    setFormData({
      ...formData,
      course: updatedCourses
    })
}
  
const handleChange = (e) => {
  if (!e.target) return

  console.log(e) 
  const { name, value } = e.target
  setFormData({
    ...formData,
    [name]: value
  })
}

  return (
    <div>
      <h2>Edit Employee</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAvatar">
          {formData.avatarUrl && <Image src={formData.avatarUrl} alt="Avatar" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} 
          />}
          <Form.Label>Change Avatar</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formContact">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDesignation">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            as="select"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          >
            <option value="">Select designation</option>
            <option value="Manager">Manager</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Check
            type="radio"
            label="Male"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="Female"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formCourse">
        <div>
          <label>Courses:</label> <br />
          <input
            type="checkbox"
            id="mca"
            name="course"
            value="MCA"
            checked={formData.course.includes('MCA')}
            onChange={handleCourseChange}
          />
          <label htmlFor="mca">MCA</label> <br />
          <input
            type="checkbox"
            id="bca"
            name="course"
            value="BCA"
            checked={formData.course.includes('BCA')}
            onChange={handleCourseChange}
          />
          <label htmlFor="bca">BCA</label> <br />
          <input
            type="checkbox"
            id="bsc"
            name="course"
            value="BSC"
            checked={formData.course.includes('BSC')}
            onChange={handleCourseChange}
          />
          <label htmlFor="bsc">BSC</label> <br />
        </div>
        </Form.Group>
     
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  )
}

export default EditEmployee
