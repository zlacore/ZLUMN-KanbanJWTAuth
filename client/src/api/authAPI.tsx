import { UserLogin } from "../interfaces/UserLogin.tsx";
// import Auth from '../utils/auth';


const loginUser = async (userLogin: UserLogin) => {
  // TODO: make a POST request to the login route

  const login = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": userLogin.username, "password": userLogin.password})
  })

  const loggedin = await login.json()
  const token = loggedin.token

  console.log('I am trying to log in!')
  console.log(token)
  if (!login.ok) {
    throw new Error("Couldn't log in!")
  }
  return token

}



export { loginUser };
