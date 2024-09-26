import { useState } from "react";
import Login from './Login'
import Register from "./Register";
import JiMButton from "../../ui/JiMButton";

const Auth = (props) => {
    const [showLogin, setShowLogin] = useState(false);

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
                <JiMButton title='Login/Register' onClick={handleToggle} />
            </div>
        </>
    )
}

export default Auth