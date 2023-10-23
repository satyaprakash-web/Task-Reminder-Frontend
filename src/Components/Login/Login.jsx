import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setEmailStore,
  setIsEmailVerifiedStore,
  setIsLoggedInStore,
  setNameStore,
  setTokenStore,
} from "../../Redux/Actions/Action";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [iconState, setIconState] = useState("bx-show");
  const [showPassword, setShowPassword] = useState(true);

  useEffect(()=>{
    const data = localStorage.getItem('details');
    try{
      const parsed = JSON.parse(data);
      if(parsed.email){
        window.location.href='/home'
      }
    } catch(error){
      
    }
  },[]);

  const eyeIconHandler = (e) => {
    e.preventDefault();
    setIconState(iconState === "bx-show" ? "bx-hide" : "bx-show");
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/login`,
        {
          email: email,
          password: password,
        }, {
          // withCredentials:true,
        }
      );

      if (data.status === "LOGIN_SUCCESSFULL") {
        alert("Login Successfully");
        dispatch(setNameStore(data.name));
        dispatch(setEmailStore(data.email));
        dispatch(setIsEmailVerifiedStore(data.isEmailVerified));
        dispatch(setIsLoggedInStore(data.isLoggedIn));
        dispatch(setTokenStore(data.token));
        localStorage.setItem('details', JSON.stringify(data));
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const forgotHandler = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <div className="login-container">
      <div className="form login">
        <div className="form-content">
          <header>Login</header>
          <form action="#">
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="field input-field">
              <input
                type={showPassword ? "password" : "text"}
                placeholder="Password"
                className="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <i
                className={`bx ${iconState} eye-icon`}
                onClick={eyeIconHandler}
              ></i>
            </div>
            <div className="form-link">
              <span onClick={forgotHandler} id="forgot-password">
                Forgot password?
              </span>
            </div>
            <div className="field button-field">
              <button onClick={submitHandler}>Login</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Don't have an account?{" "}
              <a href="/register" className="link signup-link">
                Signup
              </a>
            </span>
          </div>
        </div>
        {/* <div className="line"></div>
        <div className="media-options">
          <a href="/" className="field facebook">
            <i className="bx bxl-facebook facebook-icon"></i>
            <span>Login with Facebook</span>
          </a>
        </div>
        <div className="media-options">
          <a href="/" className="field google">
            <img src="#" alt="" className="google-img" />
            <span>Login with Google</span>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
