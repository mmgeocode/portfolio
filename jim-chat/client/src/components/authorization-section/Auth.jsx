import { useState } from "react";
import Login from './Login'
import Register from "./Register";
import JiMButton from "../../ui/JiMButton";

const Auth = (props) => {
    const [showLogin, setShowLogin] = useState(false);

    function authToggle() {
        return showLogin ? "Click to log in" : "Click to create user"
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
            <h1>AUTH</h1>
            {showLogin ? <Login updateToken = {props.updateToken} updateCurrentId = {props.updateCurrentId}/> : <Register updateToken = {props.updateToken} updateCurrentId = {props.updateCurrentId} />}

            <div className="login-register">
                <JiMButton title={ showLogin ? "Switch to register" : "Switch to login"} onClick={handleToggle}>
                    {authToggle()}
                </JiMButton>
            </div>
        </>
    )
}

export default Auth