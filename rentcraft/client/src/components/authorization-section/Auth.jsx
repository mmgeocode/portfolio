import React, { useState } from 'react';
import Login from './Login';
import Register from './Register'
import RCButton from '../../ui/RCButton';

function Auth(props) {
    const [showLogin, setShowLogin] = useState(false);

    // Toggle Between Login and Create Account
    function authToggle() {
        return showLogin
    }

    function handleToggle() {
        if (showLogin === false) {
            setShowLogin(true)
        } else {
            setShowLogin(false)
        }
    }

  return (
    <>
        <div className="authorization">
            {!showLogin ? (<Login updateToken={props.updateToken} updateCurrentId={props.updateCurrentId}/>) : (<Register updateToken={props.updateToken} updateCurrentId={props.updateCurrentId}/>)}

            <RCButton onClick={handleToggle} title={ showLogin ? "Switch to Login" : "Create New Account"}>
                {authToggle()}
            </RCButton>
        </div>
    </>
  );
}


export default Auth;