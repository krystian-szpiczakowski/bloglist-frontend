import { useState } from "react";
import loginService from "../services/login";

const Login = ({onLoginSuccess, onLoginError}) => {
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const user = await loginService.login({
      username,
      password,
    });

    if (user) {
      onLoginSuccess(user);
    } else {
      onLoginError({message: "Wrong username or password"});
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" value={username} onChange={onChangeUsername} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={onChangePassword} />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
