import axios from 'axios'

export const startRegisteruser = (userData,navigate) => {
    return async (dispatch) => {
        try {
            console.log('userdata', userData)
            const response = await axios.post('http://localhost:3321/api/users/register', userData)
            dispatch(userRegister(response.data))
            console.log(response.data, 'response')
            navigate('/login')
            window.alert('Successfully Registered Please login')
        } catch(err) {
          console.error(err)
          if (err.response && err.response.status === 400) {
            dispatch({ type: 'REGISTER_ERROR', payload: err.response.data.message})
          }
        }
    }
}

const userRegister = (userData) => {
    return {type: "USER_REGISTERED", payload: userData}
}

export const startLoginUser = (userData, navigate) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('http://localhost:3321/api/users/login', userData)
        console.log('loginres', response)
        const { token } = response.data
        localStorage.setItem('token', token)
      const user = await axios.get('http://localhost:3321/api/users/account', { headers: {
        'Authorization' : localStorage.getItem('token')
    }})  
        dispatch(userLoggedIn(user))
        navigate('/account')
      } catch (error) {
        if (error.response && error.response.status === 403) {
          dispatch({ type: 'LOGIN_ERROR', payload: error.response.data.message })
        } else if(error.response && error.response.status === 404) {
          dispatch({type: 'LOGIN_ERROR', payload: error.response.data.error})
        }
      }
    }
  }
  
  const userLoggedIn = (loggedInDoctor) => {
      return{  type: 'USER_LOGGED_IN',payload: loggedInDoctor}
  }

export const startGetUserAccount = () => {
    return async(dispatch) => {
        try{
            const token = localStorage.getItem('token')
            console.log('tok', token)
            const response = await axios.get('http://localhost:3321/api/users/account', {
                headers: {
                  'Authorization' : `${token}`
                }
            })
            console.log('serverResponse', response.data)
               dispatch(userAccount(response.data))
        } catch(err) {
            alert(err.message)
        }
    }
}

const userAccount = (userData) => {
    return {type: "USER_ACCOUNT", payload: userData}
}
