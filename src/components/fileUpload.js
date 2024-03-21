import React, { useReducer } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Form, Button, InputGroup, FormControl, Container, Col, Row } from 'react-bootstrap'

const initialState = {
  formData: {
    name: '',
    email: '',
    contact: '',
    designation: '', 
    gender: '', 
    course: [], 
    avatar: null 
  },
  loading: false,
  error: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value
        }
      }
    case 'SET_FILE':
      return {
        ...state,
        formData: {
          ...state.formData,
          avatar: action.payload.file
        }
      }
    case 'SET_COURSE':
      return {
        ...state,
        formData: {
          ...state.formData,
          course: action.payload.courses
        }
      }
    case 'RESET_FORM':
      return initialState
    case 'START_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'REQUEST_SUCCESS':
      return {
        ...state,
        loading: false
      }
    case 'REQUEST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state
  }
}

const FileUploadForm = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (e.target.name === 'contact') {
      const isValid = /^[0-9]{0,10}$/.test(e.target.value)
      if (!isValid) return
    }
    dispatch({
      type: 'SET_FORM_DATA',
      payload: {
        name: e.target.name,
        value: value
      }
    })
  }

  const handleFileChange = (e) => {
    dispatch({
      type: 'SET_FILE',
      payload: {
        file: e.target.files[0]
      }
    })
  }

  const handleCourseChange = (e) => {
    const isChecked = e.target.checked
    const courseValue = e.target.value
    let updatedCourses = isChecked ? [courseValue] : []
    dispatch({
      type: 'SET_COURSE',
      payload: {
        courses: updatedCourses
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'START_REQUEST' })
    try {
      const formData = new FormData()
      formData.append('name', state.formData.name)
      formData.append('email', state.formData.email)
      formData.append('contact', state.formData.contact)
      formData.append('designation', state.formData.designation)
      formData.append('gender', state.formData.gender)
      state.formData.course.forEach((course) => {
        formData.append('course', course)
      })
      formData.append('avatar', state.formData.avatar)

      const response = await axios.post('http://localhost:3321/api/emp/create', formData, {
        headers: {'Authorization': localStorage.getItem('token')}
      })
      console.log('Response:', response.data)
      window.alert('Profile successfully created.')

      navigate('/account')

      dispatch({ type: 'REQUEST_SUCCESS' })
      dispatch({ type: 'RESET_FORM' })
    } catch (error) {
      console.error('Error:', error)
      dispatch({ type: 'REQUEST_FAILURE', payload: { error: error.message } })
    }
  }

  return (
    <Container>
      <h2>File Upload Form</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name:</Form.Label> <br />
            <Form.Control
              type="text"
              name="name"
              value={state.formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group> <br />

          <Form.Group as={Col} controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={state.formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group> <br />

          <Form.Group as={Col} controlId="formContact">
            <Form.Label>Contact:</Form.Label>
            <Form.Control
            type="text"
            id="contact"
            name="contact"
            value={state.formData.contact}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === 'e' || e.key === '-' || e.key === '+') {
                e.preventDefault()
              }
            }}
            maxLength={10}
            required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formDesignation">
            <Form.Label>Designation:</Form.Label>
            <Form.Select
              name="designation"
              value={state.formData.designation}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGender">
            <Form.Label>Gender:</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Male"
                name="gender"
                value="Male"
                checked={state.formData.gender === 'Male'}
                onChange={handleInputChange}
                required
              />
              <Form.Check
                inline
                type="radio"
                label="Female"
                name="gender"
                value="Female"
                checked={state.formData.gender === 'Female'}
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                type="radio"
                label="Other"
                name="gender"
                value="Other"
                checked={state.formData.gender === 'Other'}
                onChange={handleInputChange}
              />
            </div>
          </Form.Group>
          <Form.Group as={Col} controlId="formCourse">
            <Form.Label>Courses:</Form.Label>
            <div>
              <Form.Check
                inline
                type="checkbox"
                id="mca"
                name="course"
                value="MCA"
                checked={state.formData.course.includes('MCA')}
                onChange={handleCourseChange}
              />
              <label htmlFor="mca">MCA</label> <br />
              <Form.Check
                inline
                type="checkbox"
                id="bca"
                name="course"
                value="BCA"
                checked={state.formData.course.includes('BCA')}
                onChange={handleCourseChange}
              />
              <label htmlFor="bca">BCA</label> <br />
              <Form.Check
                inline
                type="checkbox"
                id="bsc"
                name="course"
                value="BSC"
                checked={state.formData.course.includes('BSC')}
                onChange={handleCourseChange}
              />
              <label htmlFor="bsc">BSC</label> <br />
            </div>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formAvatar">
          <Form.Label>Img Upload:</Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={state.loading}>
          {state.loading ? 'Uploading...' : 'Upload'}
        </Button>
      </Form>

      {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}
    </Container>
  )
}

export default FileUploadForm
