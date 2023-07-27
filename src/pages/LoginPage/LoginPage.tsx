import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { authentication } from "../../utils/api"
import { AuthorizationContext } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        if (response === "username and password are required") {
          toast.warn('Username and password required', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (response === "Invavlid credentials") {
          toast.error('Invalid username or password', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

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
      <div className="login__container-form">
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
      <ToastContainer />
    </div>
  )
}

export default LoginPage
