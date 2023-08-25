import loginImage from "../../assets/images/login-imag.png";
import { ToastContainer } from "react-toastify";

interface Props {
  onSumbitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  username: string;
  password: string;
  error: {
    username: boolean;
    password: boolean;
  };
}

const LoginContainer: React.FC<Props> = ({
  onSumbitHandler,
  onChangeHandler,
  username,
  password,
  error,
}) => {
  return (
    <div className="login__container">
      <div className="login__container-form">
        <h3 className="login__container-title">Login</h3>
        <form className="login__form" onSubmit={onSumbitHandler}>
          <label className="login__form-label">
            Username
            <input
              className="login__form-input"
              type="input"
              name="username"
              placeholder="Username"
              value={username}
              onChange={onChangeHandler}
            />
            {/* {error.username ? <div>this field is required</div> : ""} */}
          </label>
          <label className="login__form-label">
            Passwords
            <input
              className={`login__form-input  ${
                error.password ? "login__form-input--invalid" : ""
              }`}
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
      <img
        className="login__form-image"
        src={loginImage}
        alt="People managing inventory"
      />
      <ToastContainer />
    </div>
  );
};

export default LoginContainer;
