import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Verify from './Components/Verify/Verify';
import Home from './Components/Home/Home';
import Forgot from './Components/ForgotPassword/Forgot';
import store from './Redux/Store/Store';
// import { useSelector } from 'react-redux';
import ResetPassword from './Components/ForgotPassword/ResetPassword';

// The store.subscribe() line adds a listener to the Redux store that logs the current state whenever it changes. This is useful for debugging and understanding the state changes in the application.
// store.subscribe(() => {console.log(store.getState())})

function App() {

  // The App component uses the useSelector hook to access the Redux store's state and extract the isEmailVerified and isLoggedIn properties from the userReducer slice of the state. These properties are used to conditionally render the Home component or the SignUp component based on whether the email is verified and the user is logged in.
  // const myStore = useSelector((store) => store.userReducer)

  // const isEmailV = myStore.isEmailVerified
  // const isLoginV = myStore.isLoggedIn

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/home' element={<Home />} />
        <Route path='/forgot-password' element={<Forgot />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
