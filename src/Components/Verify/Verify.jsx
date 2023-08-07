import React, { useState } from "react";
import "./Verify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmailStore,
  setIsEmailVerifiedStore,
  setIsLoggedInStore,
  setNameStore,
} from "../../Redux/Actions/Action";

const Verify = () => {
  // useSelector hook to access the userReducer state from the Redux store
  const myStore = useSelector((store) => store.userReducer);

  // useDispatch hook to get the dispatch function for dispatching actions to the Redux store
  const dispatch = useDispatch();

  // useState: is used to manage local state within the component. otp is a state variable that stores the OTP value entered by the user.
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Accessing the email from the Redux state
  const email = myStore.Email;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!otp) {
      return alert("please enter the OTP");
    }

    try {
      // Send a POST request to the server to verify the email using the entered OTP

      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/verifyEmail`,
        {
          email: email,
          otp: otp,
        }
      );

      // Handling different responses from the server
      if (data.status === "EMAIL_ALREADY_VERIFIED") {
        alert(data.message);
        navigate("/");
      } else if (
        data.status === "OTP_EXPIRED" ||
        data.status === "INVALID_OTP" ||
        data.status === "ERROR_OCCURED" ||
        data.status === "EMPTY_CREDENTIALS"
      ) {
        alert(data.message);
      } else if (data.status === "VERIFICATION_SUCCESSFULL") {
        alert(data.message);

        // Dispatching actions to update the user state with the received data in the Redux store based on the response from the server

        dispatch(setNameStore(data.data.name));
        dispatch(setEmailStore(data.data.email));
        dispatch(setIsEmailVerifiedStore(data.data.isEmailVerified));
        dispatch(setIsLoggedInStore(data.data.isLoggedIn));
        navigate("/home");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  // resendHandler -function is the handler for the "Resend OTP" action,triggered when the user clicks a button or performs some action to request a new OTP.

  const resendHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/resendOtp`,
        {
          email: email,
          // email variable is expected to be available in the scope of the function (e.g., defined as a state variable or received as a prop)
        }
      );
      // Once the server responds, the data variable contains the response data, include a status field indicating the result of the resend operation and a message field with a corresponding message.
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
    <div className="parent-container">
      <div className="verify-container">
        <h1>
          <span>Please verify Your</span>
          <span>Email Address</span>
        </h1>

        <div className="input-field">
          <input
            type="text"
            placeholder="Please enter the One-Time Password (OTP) received on your email address."
            className="input"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            required
          />
        </div>

        <div className="button">
          <button onClick={submitHandler}>Verify Email</button>
        </div>

        <div className="resend-link">
          <span onClick={resendHandler}>Resend OTP</span>
        </div>
      </div>
    </div>
  );
};

export default Verify;
