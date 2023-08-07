import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setEmailStore,
  setIsEmailVerifiedStore,
  setIsLoggedInStore,
  setNameStore,
} from "../../Redux/Actions/Action";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [iconState1, setIconState1] = useState("bx-show");
  const [iconState2, setIconState2] = useState("bx-show");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const eyeIconHandler1 = (e) => {
    e.preventDefault();
    setIconState1(iconState1 === "bx-show" ? "bx-hide" : "bx-show");
    setShowPassword(!showPassword);
  };

  const eyeIconHandler2 = (e) => {
    e.preventDefault();
    setIconState2(iconState2 === "bx-show" ? "bx-hide" : "bx-show");
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("password and confirm password must be same");
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/register`,
        {
          name: name,
          email: email,
          password: password,
        }
      );

      if (data.status === "EMPTY_CREDENTIALS") {
        alert(data.message);
      } else if (data.status === "REGISTRATION_SUCCESSFUL") {
        alert("Account Created Successfully");
        dispatch(setNameStore(data.name));
        dispatch(setEmailStore(data.email));
        dispatch(setIsEmailVerifiedStore(data.isEmailVerified));
        dispatch(setIsLoggedInStore(data.isLoggedIn));
        navigate("/verify");
      } else if (data.status === "EMAIL_ALREADY_EXISTS") {
        alert(data.message);
        navigate("/");
      }
    } catch (error) {
      alert("Internal server error ", error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="form signup">
        <div className="form-content">
          <header>Signup</header>
          <form action="#">
            <div className="field input-field">
              <input
                type="text"
                placeholder="Name"
                className="input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
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
                placeholder="Create password"
                className="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <i
                className={`bx ${iconState1} eye-icon`}
                onClick={eyeIconHandler1}
              ></i>
            </div>
            <div className="field input-field">
              <input
                type={showConfirmPassword ? "password" : "text"}
                placeholder="Confirm password"
                className="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
              <i
                className={`bx ${iconState2} eye-icon`}
                onClick={eyeIconHandler2}
              ></i>
            </div>
            <div className="field button-field">
              <button onClick={submitHandler}>Signup</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Already have an account?{" "}
              <a href="/" className="link login-link">
                Login
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

export default SignUp;
