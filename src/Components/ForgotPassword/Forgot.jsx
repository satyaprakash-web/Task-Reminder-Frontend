import React, { useState } from "react";
import "./Forgot.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmailStore, setNameStore } from "../../Redux/Actions/Action";

const Forgot = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isOtpSended, setIsOtpSended] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  //submitHandler- submits the user's email to request an OTP (One-Time Password) for the "Forgot Password" process. It sends a POST request to the server endpoint with the entered email.

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/user/forgot-password`,
      {
        email: email,
      }
    );

    if (data.status === "SUCCESSFULL") {
      alert(data.message);
      setIsOtpSended(true);
    }

    alert(data.message);
  };

  // verifyHandler - verify the OTP entered by the user. It sends a POST request to the server endpoint  with the email and OTP.
  const verifyHandler = async (e) => {
    e.preventDefault();
    if (!otp) {
      return alert("please enter the otp");
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/verifyEmailReset`,
        {
          email: email,
          otp: otp,
        }
      );

      if (
        data.status === "EMAIL_ALREADY_VERIFIED" ||
        data.status === "VERIFICATION_SUCCESSFULL"
      ) {
        dispatch(setEmailStore(data.data.email));
        dispatch(setNameStore(data.data.name));
        alert(data.message);
        navigate("/reset-password");
      } else if (
        data.status === "OTP_EXPIRED" ||
        data.status === "INVALID_OTP" ||
        data.status === "ERROR_OCCURED" ||
        data.status === "EMPTY_CREDENTIALS"
      ) {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const loginHandler = () => {
    navigate("/");
  };

  const resendHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/resendOtp`,
        {
          email: email,
        }
      );

      if (
        data.status === "EMPTY_CREDENTIALS" ||
        data.status === "ERROR_OCCURED" ||
        data.status === "RESENT_SUCCESSFULL"
      ) {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="m-container">
      <div className="forgot-container">
        <h1>Enter email address that is linked with your account</h1>
        <input
          type="email"
          required
          placeholder="Enter email address"
          className="email-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        {isOtpSended ? (
          <input
            type="text"
            placeholder="Enter OTP Received On Email Address"
            className="otp-input"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            required
          />
        ) : null}

        <div className="btn-container">
          <button
            className="reset-btn"
            onClick={isOtpSended ? verifyHandler : submitHandler}
          >
            {isOtpSended ? `Verify OTP` : `SEND OTP`}
          </button>
          <button className="login-btn" onClick={loginHandler}>
            Back To Login
          </button>
        </div>

        <span onClick={resendHandler} id="resend-otp">
          Resend Otp
        </span>
      </div>
    </div>
  );
};

export default Forgot;
