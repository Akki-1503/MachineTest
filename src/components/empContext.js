import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3321/api/emp/list', {
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        })
        setEmployees(response.data)
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    }

    fetchEmployees()
  }, [])

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  )
}
