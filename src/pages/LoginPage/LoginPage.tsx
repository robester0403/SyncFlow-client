import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authentication, getUserDetails } from "../../utils/api"
interface Inputs {
  username: string,
  password: string
}

const LoginPage = () => {
 
  const navigate = useNavigate()

  const defaultValues = {
    username: "",
    password: ""
  }

  const [values, setValues] = useState<Inputs>(defaultValues)
  const { username, password } = values

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues(
      {
        ...values,
        [name]: value
      }
    )
  }

  const onSumbitHandler = (event :  React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const loginRequest = async() =>{
        try {
          const response = await authentication(username, password)
          if(response === "invalid credentials"){
            console.log("Invalid username and password")
          }else{
            sessionStorage.setItem("authToken", response.data.token);
            navigate("/dashboard")
          }
          
        
      
        } catch (error) {
          console.log(error)
        }
    }
     loginRequest()

    
  }

  return (
    <form onSubmit={onSumbitHandler}>
      <label >
        Username
        <input className=""
          type="input"
          name="username"
          value={username}
          onChange={ onChangeHandler}
        />
      </label>
      <label >
        Passwords
        <input className=""
          name="password"
          type="password"
          value={password}
          onChange={onChangeHandler}
        />
      </label>
      <button>Login</button>
    </form>
  )
}

export default LoginPage
