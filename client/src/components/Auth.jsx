/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removieCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);

  console.log(cookies);

  const handleSubmit = async (e, event) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Make sure passwords match");
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/${event}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      window.location.reload()
    }
  };

  const viewLogin = (status) => {
    setIsLogin(status);
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form action="">
          <h2>{isLogin ? "Please Log in" : "Please sign up"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          )}{" "}
          <input
            type="submit"
            className="create"
            onClick={(e) => {
              handleSubmit(e, isLogin ? "login" : "signup");
            }}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            style={{
              backgroundColor: !isLogin
                ? "rgb(255,255, 255)"
                : "rgb(188, 188, 188)",
            }}
            onClick={() => viewLogin(false)}
          >
            Sign In
          </button>
          <button
            style={{
              backgroundColor: isLogin
                ? "rgb(255,255, 255)"
                : "rgb(188, 188, 188)",
            }}
            onClick={() => viewLogin(true)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
