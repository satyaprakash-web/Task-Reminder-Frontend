import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./ResetPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const myStore = useSelector((store) => store.userReducer);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = myStore.Email;
  const navigate = useNavigate();

  const resetHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("password and confirm password must be same");
    }

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/user/reset-password`,
      {
        email: email,
        password: password,
      }
    );

    if (data.status === "PASSWORD_CHANGED_SUCCESSFULLY") {
      alert(data.message);
      navigate("/");
    }

    alert(data.message);
  };

  return (
    <div className="reset-pass-container">
      <div className="reset-container">
        <h1 className="user-name">Welcome {`${myStore.Name}`}</h1>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="password-input"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="password-input"
        />

        <button className="reset-btn" onClick={resetHandler}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
