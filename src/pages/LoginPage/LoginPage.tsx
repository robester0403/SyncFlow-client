import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { authentication } from "../../utils/api"
import { AuthorizationContext } from "../../context/AuthContext";
import loginImage from "../../assets/images/login-imag.png"
import "./LoginPage.scss"
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
  const [, setAuthorized] = useContext(AuthorizationContext)

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues(
      {
        ...values,
        [name]: value
      }
    )
  }

  const onSumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginRequest = async () => {
      try {
        const response = await authentication(username, password)
        if (response === "invalid credentials") {
          console.log("Invalid username and password")
        } else {
          sessionStorage.setItem("authToken", response.data.token);
          setAuthorized(true);
          navigate("/dashboard")
        }
      } catch (error) {
        console.log(error)
      }
    }
    loginRequest()
  }

  return (
    <div className="login__container">
     <div  className="login__container-form"> 
      <h3 className="login__container-title">Login</h3>
      <form className="login__form"
        onSubmit={onSumbitHandler}>
        <label className="login__form-label" >
          Username
          <input className="login__form-input"
            type="input"
            name="username"
            placeholder="Username"
            value={username}
            onChange={onChangeHandler}
          />
        </label>
        <label className="login__form-label" >
          Passwords
          <input className="login__form-input"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangeHandler}
          />
        </label>
        <button className="login__form-button">Login</button>
      </form>
      </div>
      <img className="login__form-image"
        src={loginImage}
        alt="People managing inventory" />
    </div>
  )
}

export default LoginPage
