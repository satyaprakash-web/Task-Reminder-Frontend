import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import { useSelector, useDispatch } from "react-redux";
import {
  setEmailStore,
  setIsEmailVerifiedStore,
  setIsLoggedInStore,
  setNameStore,
  setTokenStore,
} from "../../Redux/Actions/Action";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState(new Date());
  const [reminderList, setReminderList] = useState([]);

  // useSelector hook from the react-redux library to access data from the Redux store. It retrieves the Email field from the userReducer.

  const myStore = useSelector((store) => store.userReducer);
  const email = myStore.Email;

  // useEffect hook ensures that when the component mounts or when the email variable changes (which likely occurs after login or logout), the component will fetch the user's reminders from the server and update the reminderList state with the fetched data. This way, the user's reminders are displayed on the home page whenever the data changes.

  useEffect(() => {
    // Fetch reminders only if the email is not an empty string
    if (email) {
      const fetchData = async () => {
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER}/api/reminder/getAllReminders`,
          {
            email: email,
          }
        );
  
        if (data.status === "SUCCESSFULLY_FETCHED") {
          setReminderList(data.message);
        } else {
          alert(data.message);
        }
      };
      fetchData();
    }
  }, [email]);
 
  // addReminder function is responsible for sending the user's new reminder data to the server, updating the reminders list in the UI if the request is successful, and resetting the input fields for the next reminder.

  const addReminder = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/reminder/addReminders`,
      { reminderMsg, remindAt, email }
    );

    if (data.status === "SUCCESSFULLY_FETCHED") {
      setReminderList(data.message);
    } else {
      alert(data.message);
    }
    setReminderMsg("");
    setRemindAt(new Date());
  };

  // axios.post to make an HTTP POST request to the server endpoint and sends the id and email as the request payload.
  // const { data } = ...: After the response is received from the server, the data field of the response object is destructured to extract the data from the server's response. The server's response is expected to contain a status field and a message field.

  const deleteReminder = async (id, email) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/reminder/deleteReminders`,
      { id, email },

    );

    if (data.status === "SUCCESSFULLY_FETCHED") {
      setReminderList(data.message);
    } else {
      alert(data.message);
    }
  };

  // e.preventDefault(); prevents the default behavior of the event, which is important because if you don't want the browser to perform its default action (e.g., navigating to a new page) when the "Log Out" button is clicked.

  // dispatch function used to dispatch actions to the Redux store.A series of dispatch calls are made to reset the user-related data in the Redux store.

  useEffect(()=>{
    const data = localStorage.getItem('details');
    try{
      const parsed = JSON.parse(data);
      dispatch(setNameStore(parsed.name));
      dispatch(setEmailStore(parsed.email));
      dispatch(setIsEmailVerifiedStore(parsed.isEmailVerified));
      dispatch(setIsLoggedInStore(parsed.isLoggedIn));
      dispatch(setTokenStore(parsed.token));


    } catch(error){
      window.location.href = '/';
    }
  },[]);

  const logOutHandler = async(e) => {
    e.preventDefault();

    const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/user/logout`, {
      email: email
    });

    localStorage.clear();

    dispatch(setNameStore(""));
    dispatch(setEmailStore(""));
    dispatch(setIsEmailVerifiedStore(false));
    dispatch(setIsLoggedInStore(false));
    dispatch(setTokenStore(""));

    navigate("/");
  };

  return (
    <div className="homepage-container">
      <div className="homepage">
        <div className="header-wrapper">
          <h1>Welcome {`${myStore.Name}`}</h1>
          <button className="log-out-btn" onClick={logOutHandler}>
            Log Out
          </button>
        </div>
        <div className="homepage_header">
          <h1>Remind Me 🙋‍♂️</h1>
          <input
            type="text"
            placeholder="Reminder notes here..."
            value={reminderMsg}
            onChange={(e) => setReminderMsg(e.target.value)}
          />
          <DatePicker
            selected={remindAt}
            onChange={(date) => setRemindAt(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
          />
          <div className="button" onClick={addReminder}>
            Add Reminder
          </div>
        </div>

        <div className="homepage_body">
          {reminderList.length === 0
            ? null
            : reminderList.map((reminder) => (
                <div className="reminder_card" key={reminder._id}>
                  <h2>{reminder.reminderMessage}</h2>
                  <h3>Remind Me at :</h3>
                  <p>
                    {String(
                      new Date(
                        reminder.remindAt.toLocaleString(undefined, {
                          timezone: "Asia/Kolkata",
                        })
                      )
                    )}
                  </p>
                  <div
                    className="button"
                    onClick={() => deleteReminder(reminder._id, email)}
                  >
                    Delete Reminder
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
