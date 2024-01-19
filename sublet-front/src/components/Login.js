function Login({ id, password }) {
  const login = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      path: '/',
      body: JSON.stringify({
        id: id,
        password: password
      })
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result login', response)
      })
      .catch((e) => {
        console.log('[error] login', e)
      })
  };
  login()
}

function Logout() {
  const logout = async () => {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      path: '/',
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, requestOptions)
      .then(res => res.json())
      .then(response => {
        console.log('result logout', response)
      })
      .catch((e) => {
        console.log('[error] logout', e)
      })
  };
  logout()
}


export { Login, Logout };