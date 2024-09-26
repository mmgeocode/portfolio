import { useState } from "react";
import Login from './Login'
import Register from "./Register";
import JiMButton from "../../ui/JiMButton";

const Auth = (props) => {
    const [showLogin, setShowLogin] = useState(false);

    function authToggle() {
        return showLogin ? "Clock to log in" : "Click to create user"
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
            {showLogin ? <Login updateToken = {props.updateToken}/> : <Register updateToken = {props.updateToken}/>}

            <div className="login-register">
                <JiMButton title='Login/Register' onClick={handleToggle}>
                    {authToggle()}
                </JiMButton>
            </div>
        </>
    )
}

export default Auth